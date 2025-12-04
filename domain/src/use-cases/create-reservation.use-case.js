"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReservationUseCase = void 0;
const Reservation_1 = require("../entities/Reservation");
const index_1 = require("../errors/index");
class CreateReservationUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    isOverlapping(aStart, aEnd, bStart, bEnd) {
        // overlap if start < otherEnd AND otherStart < end
        return aStart < bEnd && bStart < aEnd;
    }
    async execute(data) {
        if (data.checkOutDate <= data.checkInDate) {
            throw new index_1.InvalidDatesError();
        }
        // check existing reservations for this room
        const existing = await this.repo.findByRoomId(data.roomId);
        for (const e of existing) {
            if (this.isOverlapping(data.checkInDate, data.checkOutDate, e.checkInDate, e.checkOutDate)) {
                throw new index_1.OverlappingReservationError();
            }
        }
        const reservation = new Reservation_1.Reservation(data);
        await this.repo.save(reservation);
        return reservation;
    }
}
exports.CreateReservationUseCase = CreateReservationUseCase;
