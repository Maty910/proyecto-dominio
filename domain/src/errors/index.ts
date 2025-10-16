export class InvalidDatesError extends Error {
  constructor(message = "Check-out date must be after check-in date") {
    super(message);
    this.name = "InvalidDatesError"
  }
}

export class OverlappingReservationError extends Error {
  constructor(message = "Reservation dates overlap with existing booking for this room") {
    super(message)
    this.name = "OverlappingReservationError"
  }
}