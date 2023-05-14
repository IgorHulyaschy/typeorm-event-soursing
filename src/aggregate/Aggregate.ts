import { randomUUID } from 'crypto'
import { Event } from '../message'

export abstract class Aggregate<TEvent extends Event<any>> {
  id: string = randomUUID()
  version = 0

  domainEvents: TEvent[] = []

  abstract on(event: TEvent): void

  addEvents(events: TEvent | TEvent[]): this {
    const domainEvents = Array.isArray(events) ? events : [events]

    for (const event of domainEvents) {
      if (!event.aggregateId) event.aggregateId = this.id
      if (!event.aggregateVersion) event.aggregateVersion = this.version + 1
      this.domainEvents.push(event)
      this.onEvent(event)
    }
    return this
  }

  private onEvent(event: TEvent): void {
    this.id = event.aggregateId
    this.version = event.aggregateVersion > this.version ? event.aggregateVersion : this.version
    this.on(event)
  }
}
