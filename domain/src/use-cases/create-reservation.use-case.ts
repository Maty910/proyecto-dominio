import { Reservation, ReservationStatus } from "../entities/Reservation"
import { ReservationRepository } from "../services/ReservationRepository";

interface CreateReservationRequest {
  id: string;
  userId: string;
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date;
  status: ReservationStatus
}

function datesOverlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  // Overlap if start < other end AND other start < end
  return aStart < bEnd && bStart < aEnd;
}

export class CreateReservationUseCase {
  constructor(private repo: ReservationRepository) {}

    async execute(data: CreateReservationRequest): Promise<Reservation> {
      if (data.checkOutDate <= data.checkInDate) {
        throw new Error("Check-out date must be after check-in date")
      }
    // check existing reservations for this room
    const existing = await this.repo.findByRoomId(data.roomId)

    const hasOverlap = existing.some(r => 
      datesOverlap(r.checkInDate, r.checkOutDate, data.checkInDate, data.checkOutDate)
    )

    if (hasOverlap) {
      throw new Error("Reservation dates overlap with existing booking for this room")
    }

    const reservation = new Reservation(data)
    await this.repo.save(reservation)
    return reservation
  }
}