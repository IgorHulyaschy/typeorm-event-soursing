import { Message } from './Message';
export declare class Event<Payload> extends Message<Payload> {
    readonly payload: Payload;
    id: string;
    aggregateId: string;
    aggregateVersion: number;
    readonly kind: string;
    saved?: boolean;
    constructor(payload: Payload);
    get uniqueKey(): string;
}
//# sourceMappingURL=Event.d.ts.map