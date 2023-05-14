"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUniqueKeyError = exports.createAggregateEntity = void 0;
const typeorm_1 = require("typeorm");
function createAggregateEntity(tableName) {
    let AggregateEntity = class AggregateEntity {
        constructor() {
            Object.defineProperty(this, "id", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
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
                value: void 0
            });
            Object.defineProperty(this, "payload", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "saved", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "uniqueKey", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "createdAt", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
        }
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], AggregateEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], AggregateEntity.prototype, "aggregateId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], AggregateEntity.prototype, "aggregateVersion", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], AggregateEntity.prototype, "kind", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
            type: 'jsonb'
        }),
        __metadata("design:type", Object)
    ], AggregateEntity.prototype, "payload", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: true }),
        __metadata("design:type", Boolean)
    ], AggregateEntity.prototype, "saved", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        __metadata("design:type", String)
    ], AggregateEntity.prototype, "uniqueKey", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], AggregateEntity.prototype, "createdAt", void 0);
    AggregateEntity = __decorate([
        (0, typeorm_1.Entity)({ name: tableName }),
        (0, typeorm_1.Index)(['aggregateId', 'aggregateVersion'], { unique: true })
    ], AggregateEntity);
    return AggregateEntity;
}
exports.createAggregateEntity = createAggregateEntity;
function isIndexError(error) {
    return error instanceof typeorm_1.QueryFailedError && error.code === '23505';
}
function isUniqueKeyError(error) {
    return isIndexError(error) && error.detail.includes('uniqueKey');
}
exports.isUniqueKeyError = isUniqueKeyError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3R5cGVvcm0tdXRpbHMvRW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLHFDQUFnRjtBQUdoRixTQUFnQixxQkFBcUIsQ0FBQyxTQUFpQjtJQUdyRCxJQUFNLGVBQWUsR0FBckIsTUFBTSxlQUFlO1FBQXJCO1lBQ0U7Ozs7O2VBQ1c7WUFFWDs7Ozs7ZUFDb0I7WUFFcEI7Ozs7O2VBQ3lCO1lBRXpCOzs7OztlQUNhO1lBRWI7Ozs7O2VBSTZCO1lBRTdCOzs7OztlQUNlO1lBRWY7Ozs7O2VBQ2tCO1lBRWxCOzs7OztlQUNnQjtRQUNsQixDQUFDO0tBQUEsQ0FBQTtJQTFCQztRQUFDLElBQUEsdUJBQWEsR0FBRTs7K0NBQ0w7SUFFWDtRQUFDLElBQUEsZ0JBQU0sR0FBRTs7d0RBQ1c7SUFFcEI7UUFBQyxJQUFBLGdCQUFNLEdBQUU7OzZEQUNnQjtJQUV6QjtRQUFDLElBQUEsZ0JBQU0sR0FBRTs7aURBQ0k7SUFFYjtRQUFDLElBQUEsZ0JBQU0sRUFBQztZQUNOLFFBQVEsRUFBRSxJQUFJO1lBQ2QsSUFBSSxFQUFFLE9BQU87U0FDZCxDQUFDOztvREFDMkI7SUFFN0I7UUFBQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7O2tEQUNYO0lBRWY7UUFBQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7O3NEQUNQO0lBRWxCO1FBQUMsSUFBQSxnQkFBTSxHQUFFO2tDQUNHLElBQUk7c0RBQUE7SUExQlosZUFBZTtRQUZwQixJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7UUFDM0IsSUFBQSxlQUFLLEVBQUMsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztPQUN2RCxlQUFlLENBMkJwQjtJQUVELE9BQU8sZUFBZSxDQUFBO0FBQ3hCLENBQUM7QUFqQ0Qsc0RBaUNDO0FBRUQsU0FBUyxZQUFZLENBQUMsS0FBWTtJQUNoQyxPQUFPLEtBQUssWUFBWSwwQkFBZ0IsSUFBSyxLQUFhLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQTtBQUM3RSxDQUFDO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQUMsS0FBWTtJQUMzQyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUNsRSxDQUFDO0FBRkQsNENBRUMifQ==