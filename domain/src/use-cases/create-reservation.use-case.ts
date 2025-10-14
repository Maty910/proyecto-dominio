import { Reservation, ReservationStatus } from "../entities/Reservation"

interface CreateReservationRequest {
  id: string;
  userId: string;
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date;
  status: ReservationStatus
}

export class CreateReservationUseCase {
  execute(data: CreateReservationRequest): Reservation {
    if (data.checkOutDate <= data.checkInDate) {
      throw new Error("Check-out date must be after check-in date")
    }

    return new Reservation(data)
  }
}