"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const crypto_1 = require("crypto");
const Message_1 = require("./Message");
class Event extends Message_1.Message {
    constructor(payload) {
        super(payload);
        Object.defineProperty(this, "payload", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: payload
        });
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (0, crypto_1.randomUUID)()
        });
        Object.defineProperty(this, "aggregateId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "aggregateVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.constructor.name
        });
        Object.defineProperty(this, "saved", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    get uniqueKey() {
        return this.id;
    }
}
exports.Event = Event;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWVzc2FnZS9FdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsdUNBQW1DO0FBRW5DLE1BQWEsS0FBZSxTQUFRLGlCQUFnQjtJQU9sRCxZQUFxQixPQUFnQjtRQUNuQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7Ozs7O21CQURLOztRQU5yQjs7OzttQkFBYSxJQUFBLG1CQUFVLEdBQUU7V0FBQTtRQUN6Qjs7Ozs7V0FBb0I7UUFDcEI7Ozs7O1dBQXlCO1FBQ3pCOzs7O21CQUFnQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7V0FBQTtRQUNyQzs7Ozs7V0FBZTtJQUlmLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUE7SUFDaEIsQ0FBQztDQUNGO0FBZEQsc0JBY0MifQ==