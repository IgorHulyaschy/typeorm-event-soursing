"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggregate = void 0;
const crypto_1 = require("crypto");
class Aggregate {
    constructor() {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (0, crypto_1.randomUUID)()
        });
        Object.defineProperty(this, "version", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "domainEvents", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    addEvents(events) {
        const domainEvents = Array.isArray(events) ? events : [events];
        for (const event of domainEvents) {
            if (!event.aggregateId)
                event.aggregateId = this.id;
            if (!event.aggregateVersion)
                event.aggregateVersion = this.version + 1;
            this.domainEvents.push(event);
            this.onEvent(event);
        }
        return this;
    }
    onEvent(event) {
        this.id = event.aggregateId;
        this.version = event.aggregateVersion > this.version ? event.aggregateVersion : this.version;
        this.on(event);
    }
}
exports.Aggregate = Aggregate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdncmVnYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FnZ3JlZ2F0ZS9BZ2dyZWdhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBR25DLE1BQXNCLFNBQVM7SUFBL0I7UUFDRTs7OzttQkFBYSxJQUFBLG1CQUFVLEdBQUU7V0FBQTtRQUN6Qjs7OzttQkFBVSxDQUFDO1dBQUE7UUFFWDs7OzttQkFBeUIsRUFBRTtXQUFBO0lBcUI3QixDQUFDO0lBakJDLFNBQVMsQ0FBQyxNQUF5QjtRQUNqQyxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFOUQsS0FBSyxNQUFNLEtBQUssSUFBSSxZQUFZLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXO2dCQUFFLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQTtZQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQjtnQkFBRSxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUE7WUFDdEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNwQjtRQUNELE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUVPLE9BQU8sQ0FBQyxLQUFhO1FBQzNCLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQTtRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDNUYsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNoQixDQUFDO0NBQ0Y7QUF6QkQsOEJBeUJDIn0=