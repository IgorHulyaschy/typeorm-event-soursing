/* eslint-disable new-cap */
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { Class, PartialDeep } from 'type-fest'
import { getManager, In } from 'typeorm'
import { Aggregate } from '../aggregate'
import { Event } from '../message'
import { isUniqueKeyError } from './Entity'

export interface IAggregateRepository<
  TAggregate extends Aggregate<any>,
  TAggregateEvent extends Event<any>
> {
  save: (aggregate: TAggregate) => Promise<void>
  findOne: ({ aggregateId }: { aggregateId: string }) => Promise<TAggregate>
  findAllByEvent: <TEvent extends Class<Event<any>>>(
    event: TEvent,
    { payload }: PartialDeep<TAggregateEvent>
  ) => Promise<TAggregate[]>
}

export function AggregateRepository<TAggregate extends Aggregate<any>, TEvent extends Event<any>>({
  aggregate,
  entity,
  aggregateEvents
}: {
  aggregate: Class<TAggregate>
  entity: Class<TEvent>
  aggregateEvents: Array<Class<TEvent>>
}): Class<IAggregateRepository<TAggregate, TEvent>> {
  class Repo implements IAggregateRepository<TAggregate, TEvent> {
    private mapToEvent<T extends TEvent>(
      eventEntity: Event<any>,
      eventsAggregate: Array<Class<T>>
    ): T {
      const ctor = eventsAggregate.find((e) => e.name === eventEntity.kind)
      if (!ctor) throw new Error('Cannot coerce message.')

      return plainToInstance(ctor, eventEntity)
    }

    async findOne(
      { aggregateId }: { aggregateId: string },
      em = getManager()
    ): Promise<TAggregate> {
      const events = await em
        .createQueryBuilder(entity, 'e')
        .select()
        .where({
          aggregateId,
          eventName: In(aggregateEvents.map((event) => event.name))
        })
        .orderBy('e.aggregateVersion', 'ASC')
        .getMany()
      const mapedEvents = events.map(
        (e: {
          id: string
          aggregateVersion: number
          aggregateId: string
          payload: Record<string, any>
          kind: string
          saved?: boolean
          uniqueKey: string
        }) => this.mapToEvent(e, aggregateEvents)
      )
      return new aggregate().addEvents(mapedEvents)
    }

    async findAllByEvent<TAggregateEvent extends Class<Event<any>>>(
      event: TAggregateEvent,
      { payload }: PartialDeep<TEvent>,
      em = getManager()
    ): Promise<TAggregate[]> {
      const qb = em.createQueryBuilder(entity, 'e').select().where({
        eventName: event.name
      })
      const query = payload ? qb.andWhere(`payload @> :payload`, { payload }) : qb

      const events = await query.orderBy('e.aggregateVersion', 'ASC').getMany()

      return Promise.all(events.map((event) => this.findOne({ aggregateId: event.aggregateId })))
    }

    async save(aggregate: TAggregate, em = getManager()): Promise<void> {
      try {
        const aggsCopy = ([] as TAggregate[]).concat(aggregate)
        const eventsToSave = aggsCopy
          .map((a) => a.domainEvents)
          .flat()
          .filter((de) => !de.saved)
          .map((de) => plainToInstance(entity, instanceToPlain(de)))
        await em.save(eventsToSave)
      } catch (err) {
        if (isUniqueKeyError(err)) throw new Error('Not unique')
        throw err
      }
    }
  }
  return Repo
}
