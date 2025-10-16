import { Reservation, ReservationStatus } from "../entities/Reservation"
import { ReservationRepository } from "../services/ReservationRepository";
import { InvalidDatesError, OverlappingReservationError } from "../errors/index"

interface CreateReservationRequest {
  id: string;
  userId: string;
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date;
  status: ReservationStatus
}

export class CreateReservationUseCase {
  constructor(private repo: ReservationRepository) {}

  private isOverlapping(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
    // overlap if start < otherEnd AND otherStart < end
    return aStart < bEnd && bStart < aEnd;
  }

  async execute(data: CreateReservationRequest): Promise<Reservation> {
    if (data.checkOutDate <= data.checkInDate) {
      throw new InvalidDatesError()
    }
    // check existing reservations for this room
    const existing = await this.repo.findByRoomId(data.roomId)

    for (const e of existing) {
      if (this.isOverlapping(data.checkInDate, data.checkOutDate, e.checkInDate, e.checkOutDate)) {
        throw new OverlappingReservationError()
      }
    }

    const reservation = new Reservation(data)
    await this.repo.save(reservation)
    return reservation
  }
}