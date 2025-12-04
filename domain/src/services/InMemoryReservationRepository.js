"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryReservationRepository = void 0;
class InMemoryReservationRepository {
    constructor() {
        this.items = [];
    }
    async save(reservation) {
        const index = this.items.findIndex(r => r.id === reservation.id);
        if (index !== -1) {
            // If already exists, replace reservation
            this.items[index] = reservation;
        }
        else {
            this.items.push(reservation);
        }
    }
    async findById(id) {
        const reservation = this.items.find(r => r.id === id);
        return reservation || null;
    }
    async findAll() {
        return this.items;
    }
    async findByRoomId(roomId) {
        return this.items.filter(r => r.roomId === roomId);
    }
    async delete(id) {
        for (let i = this.items.length - 1; i >= 0; i--) {
            if (this.items[i].id === id) {
                this.items.splice(i, 1);
            }
        }
    }
    clear() {
        this.items = [];
    }
}
exports.InMemoryReservationRepository = InMemoryReservationRepository;
