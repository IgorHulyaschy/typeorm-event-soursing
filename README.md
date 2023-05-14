# How to start


## 1. Creating domain events:
```ts
import { Event } from 'typeorm-event-soursing'

export class UserCreatedEvent extends Event<{ fname: string, lname: string, id: string }> {}

export class UserUpdatedEvent extends Event<{ phone: string }> {}
```

## 2. Creating aggregate:
```ts
import { Aggregate } from 'typeorm-event-soursing'
import { UserUpdatedEvent, UserCreatedEvent } './path/to/events'

export class User extends Aggregate<UserUpdatedEvent | UserCreatedEvent> {
  fname!: string
  lname!: string
  phone?: string

  on(event: UserUpdatedEvent | UserCreatedEvent) {
    if(event instanceof UserUpdatedEvent) {
      this.phone = event.payload.phone
    }
    if(event instanceof UserCreatedEvent) {
      this.fname = event.payload.fname
      this.lname = event.payload.lname
    }
  }

  static create(dto: { lname: string, fname: string }): User {
    return new User().addEvents(new UserCreatedEvent({ ...dto, id: randomUUID() }))
  }

  updatePhone(dto: { phone: string }): this {
    return this.addEvents(new UserUpdatedEvent(dto))
  }
}
```

## 3. Creating typeorm repository and entity:
```ts
import { createAggregateEntity, AggregateRepository } from 'typeorm-event-soursing'
import { User } from './User'

const UserEntity = createAggregateEntity('user')

export class UserRepository extends AggregateRepository<User, UserCreatedEvent | UserUpdatedEvent>({
  aggregate: User,
  entity: UserEntity,
  aggregateEvents: [UserCreatedEvent, UserUpdatedEvent]
}) {}
```

## 4. Usage of repository:
```ts
import { UserRepository } from './UserRepository'
import { User } from './User'

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  createUser(dto: { lname: string, fname: string }) {
    const user = User.create(dto)
    await this.repository.save(user)
  }

  updatePhone(dto: { id: string; phone: string }) {
    const user = await this.repository.findOne({ aggregateId: id })
    if(!user) throw new Error()

    await this.repository.save(user.updatePhone({ phone: dto.phone }))
  }
}
```

