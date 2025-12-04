"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchReservationUseCase = void 0;
const Reservation_1 = require("../entities/Reservation");
const errors_1 = require("../errors");
class PatchReservationUseCase {
    constructor(reservationRepo) {
        this.reservationRepo = reservationRepo;
    }
    async execute(input) {
        const existing = await this.reservationRepo.findById(input.id);
        if (!existing) {
            throw new errors_1.ReservationNotFoundError();
        }
        // Apply changes comming from the input
        const updated = new Reservation_1.Reservation({
            id: input.id,
            userId: input.userId ?? existing.userId,
            roomId: input.roomId ?? existing.roomId,
            checkInDate: input.checkInDate ?? existing.checkInDate,
            checkOutDate: input.checkOutDate ?? existing.checkOutDate,
            status: input.status ?? existing.status
        });
        if (updated.checkOutDate <= updated.checkInDate) {
            throw new errors_1.InvalidDatesError();
        }
        await this.reservationRepo.save(updated);
        return updated;
    }
}
exports.PatchReservationUseCase = PatchReservationUseCase;
