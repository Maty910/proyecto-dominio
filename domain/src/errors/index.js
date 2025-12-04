"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationNotFoundError = exports.OverlappingReservationError = exports.InvalidDatesError = void 0;
class InvalidDatesError extends Error {
    constructor(message = "Check-out date must be after check-in date") {
        super(message);
        this.name = "InvalidDatesError";
    }
}
exports.InvalidDatesError = InvalidDatesError;
class OverlappingReservationError extends Error {
    constructor(message = "Reservation dates overlap with existing booking for this room") {
        super(message);
        this.name = "OverlappingReservationError";
    }
}
exports.OverlappingReservationError = OverlappingReservationError;
class ReservationNotFoundError extends Error {
    constructor(message = "Reservation not found") {
        super(message);
        this.name = "ReservationNotFoundError";
    }
}
exports.ReservationNotFoundError = ReservationNotFoundError;
