"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetReservationsByRoomUseCase = void 0;
class GetReservationsByRoomUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(roomId) {
        return this.repo.findByRoomId(roomId);
    }
}
exports.GetReservationsByRoomUseCase = GetReservationsByRoomUseCase;
