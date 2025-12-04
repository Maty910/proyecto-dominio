"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReservationUseCase = void 0;
const Reservation_1 = require("../entities/Reservation");
const errors_1 = require("../errors");
class UpdateReservationUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    isOverlapping(aStart, aEnd, bStart, bEnd) {
        return aStart < bEnd && bStart < aEnd;
    }
    async execute(data) {
        // Search existing reservation from the same room
        const reservations = await this.repo.findByRoomId(data.roomId);
        const existing = reservations.find(r => r.id === data.id);
        if (!existing) {
            throw new Error("Reservation not found");
        }
        // Validate dates
        if (data.checkInDate >= data.checkOutDate) {
            throw new errors_1.InvalidDatesError();
        }
        // Verify overlapping with other reservations
        for (const e of reservations) {
            if (e.id !== data.id && this.isOverlapping(data.checkInDate, data.checkOutDate, e.checkInDate, e.checkOutDate)) {
                throw new errors_1.OverlappingReservationError();
            }
        }
        // Update existing reservation
        const updatedReservation = new Reservation_1.Reservation({
            id: existing.id,
            userId: data.userId,
            roomId: data.roomId,
            checkInDate: data.checkInDate,
            checkOutDate: data.checkOutDate,
            status: data.status
        });
        await this.repo.save(updatedReservation);
        return updatedReservation;
    }
}
exports.UpdateReservationUseCase = UpdateReservationUseCase;
