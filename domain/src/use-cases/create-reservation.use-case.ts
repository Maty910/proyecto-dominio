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
    return new Reservation(data)
  }
}