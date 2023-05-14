"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRepository = void 0;
/* eslint-disable new-cap */
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const Entity_1 = require("./Entity");
function AggregateRepository({ aggregate, entity, aggregateEvents }) {
    class Repo {
        mapToEvent(eventEntity, eventsAggregate) {
            const ctor = eventsAggregate.find((e) => e.name === eventEntity.kind);
            if (!ctor)
                throw new Error('Cannot coerce message.');
            return (0, class_transformer_1.plainToInstance)(ctor, eventEntity);
        }
        async findOne({ aggregateId }, em = (0, typeorm_1.getManager)()) {
            const events = await em
                .createQueryBuilder(entity, 'e')
                .select()
                .where({
                aggregateId,
                eventName: (0, typeorm_1.In)(aggregateEvents.map((event) => event.name))
            })
                .orderBy('e.aggregateVersion', 'ASC')
                .getMany();
            const mapedEvents = events.map((e) => this.mapToEvent(e, aggregateEvents));
            return new aggregate().addEvents(mapedEvents);
        }
        async findAllByEvent(event, { payload }, em = (0, typeorm_1.getManager)()) {
            const qb = em.createQueryBuilder(entity, 'e').select().where({
                eventName: event.name
            });
            const query = payload ? qb.andWhere(`payload @> :payload`, { payload }) : qb;
            const events = await query.orderBy('e.aggregateVersion', 'ASC').getMany();
            return Promise.all(events.map((event) => this.findOne({ aggregateId: event.aggregateId })));
        }
        async save(aggregate, em = (0, typeorm_1.getManager)()) {
            try {
                const aggsCopy = [].concat(aggregate);
                const eventsToSave = aggsCopy
                    .map((a) => a.domainEvents)
                    .flat()
                    .filter((de) => !de.saved)
                    .map((de) => (0, class_transformer_1.plainToInstance)(entity, (0, class_transformer_1.instanceToPlain)(de)));
                await em.save(eventsToSave);
            }
            catch (err) {
                if ((0, Entity_1.isUniqueKeyError)(err))
                    throw new Error('Not unique');
                throw err;
            }
        }
    }
    return Repo;
}
exports.AggregateRepository = AggregateRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdncmVnYXRlUmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90eXBlb3JtLXV0aWxzL0FnZ3JlZ2F0ZVJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNEJBQTRCO0FBQzVCLHlEQUFvRTtBQUVwRSxxQ0FBd0M7QUFHeEMscUNBQTJDO0FBYzNDLFNBQWdCLG1CQUFtQixDQUErRCxFQUNoRyxTQUFTLEVBQ1QsTUFBTSxFQUNOLGVBQWUsRUFLaEI7SUFDQyxNQUFNLElBQUk7UUFDQSxVQUFVLENBQ2hCLFdBQXVCLEVBQ3ZCLGVBQWdDO1lBRWhDLE1BQU0sSUFBSSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3JFLElBQUksQ0FBQyxJQUFJO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUVwRCxPQUFPLElBQUEsbUNBQWUsRUFBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDM0MsQ0FBQztRQUVELEtBQUssQ0FBQyxPQUFPLENBQ1gsRUFBRSxXQUFXLEVBQTJCLEVBQ3hDLEVBQUUsR0FBRyxJQUFBLG9CQUFVLEdBQUU7WUFFakIsTUFBTSxNQUFNLEdBQUcsTUFBTSxFQUFFO2lCQUNwQixrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO2lCQUMvQixNQUFNLEVBQUU7aUJBQ1IsS0FBSyxDQUFDO2dCQUNMLFdBQVc7Z0JBQ1gsU0FBUyxFQUFFLElBQUEsWUFBRSxFQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMxRCxDQUFDO2lCQUNELE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUM7aUJBQ3BDLE9BQU8sRUFBRSxDQUFBO1lBQ1osTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FDNUIsQ0FBQyxDQVFBLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUMxQyxDQUFBO1lBQ0QsT0FBTyxJQUFJLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUMvQyxDQUFDO1FBRUQsS0FBSyxDQUFDLGNBQWMsQ0FDbEIsS0FBc0IsRUFDdEIsRUFBRSxPQUFPLEVBQXVCLEVBQ2hDLEVBQUUsR0FBRyxJQUFBLG9CQUFVLEdBQUU7WUFFakIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQzNELFNBQVMsRUFBRSxLQUFLLENBQUMsSUFBSTthQUN0QixDQUFDLENBQUE7WUFDRixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7WUFFNUUsTUFBTSxNQUFNLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBRXpFLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM3RixDQUFDO1FBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFxQixFQUFFLEVBQUUsR0FBRyxJQUFBLG9CQUFVLEdBQUU7WUFDakQsSUFBSTtnQkFDRixNQUFNLFFBQVEsR0FBSSxFQUFtQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQkFDdkQsTUFBTSxZQUFZLEdBQUcsUUFBUTtxQkFDMUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO3FCQUMxQixJQUFJLEVBQUU7cUJBQ04sTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cUJBQ3pCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBQSxtQ0FBZSxFQUFDLE1BQU0sRUFBRSxJQUFBLG1DQUFlLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUM1RCxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7YUFDNUI7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixJQUFJLElBQUEseUJBQWdCLEVBQUMsR0FBRyxDQUFDO29CQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUE7Z0JBQ3hELE1BQU0sR0FBRyxDQUFBO2FBQ1Y7UUFDSCxDQUFDO0tBQ0Y7SUFDRCxPQUFPLElBQUksQ0FBQTtBQUNiLENBQUM7QUE5RUQsa0RBOEVDIn0=