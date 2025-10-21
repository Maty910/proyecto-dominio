import { Reservation,  ReservationStatus } from '../entities/Reservation'
import { ReservationRepository } from '../services/ReservationRepository'
import { InvalidDatesError, OverlappingReservationError } from '../errors'

interface UpdateReservationRequest {
  id: string,
  userId: string,
  roomId: string,
  checkInDate: Date,
  checkOutDate: Date,
  status: ReservationStatus
}

export class UpdateReservationUseCase  {
  constructor(private repo: ReservationRepository) {}

  private isOverlapping(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
    return aStart < bEnd && bStart < aEnd
  }

  async execute(data: UpdateReservationRequest): Promise<Reservation> {
    // Search existing reservation from the same room
    const reservations = await this.repo.findByRoomId(data.roomId)
    const existing = reservations.find(r => r.id === data.id)

    if (!existing) {
      throw new Error("Reservation not found")
    }

    // Validate dates
    if (data.checkInDate >= data.checkOutDate){
      throw new InvalidDatesError()
    }

    // Verify overlapping with other reservations
    for (const e of reservations) {
      if (e.id !== data.id && this.isOverlapping(data.checkInDate, data.checkOutDate, e.checkInDate, e.checkOutDate)) {
        throw new OverlappingReservationError()
      }
    }
    
    // Update existing reservation
    const updatedReservation = new Reservation({
      id: existing.id,
      userId: data.userId,
      roomId: data.roomId,
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      status: data.status
    })

    await this.repo.save(updatedReservation)
    return updatedReservation
  }
}