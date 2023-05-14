import { randomUUID } from 'crypto'
import { Message } from './Message'

export class Event<Payload> extends Message<Payload> {
  id: string = randomUUID()
  aggregateId!: string
  aggregateVersion!: number
  readonly kind = this.constructor.name
  saved?: boolean

  constructor(readonly payload: Payload) {
    super(payload)
  }

  get uniqueKey(): string {
    return this.id
  }
}
