import { Class, PartialDeep } from 'type-fest';
import { Aggregate } from '../aggregate';
import { Event } from '../message';
export interface IAggregateRepository<TAggregate extends Aggregate<any>, TAggregateEvent extends Event<any>> {
    save: (aggregate: TAggregate) => Promise<void>;
    findOne: ({ aggregateId }: {
        aggregateId: string;
    }) => Promise<TAggregate>;
    findAllByEvent: <TEvent extends Class<Event<any>>>(event: TEvent, { payload }: PartialDeep<TAggregateEvent>) => Promise<TAggregate[]>;
}
export declare function AggregateRepository<TAggregate extends Aggregate<any>, TEvent extends Event<any>>({ aggregate, entity, aggregateEvents }: {
    aggregate: Class<TAggregate>;
    entity: Class<TEvent>;
    aggregateEvents: Array<Class<TEvent>>;
}): Class<IAggregateRepository<TAggregate, TEvent>>;
//# sourceMappingURL=AggregateRepository.d.ts.map