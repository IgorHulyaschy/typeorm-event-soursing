import { Event } from '../message';
export declare abstract class Aggregate<TEvent extends Event<any>> {
    id: string;
    version: number;
    domainEvents: TEvent[];
    abstract on(event: TEvent): void;
    addEvents(events: TEvent | TEvent[]): this;
    private onEvent;
}
//# sourceMappingURL=Aggregate.d.ts.map