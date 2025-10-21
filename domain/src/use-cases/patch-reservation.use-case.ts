import { Reservation } from '../entities/Reservation'
import { InMemoryReservationRepository } from '../services/InMemoryReservationRepository'
import { ReservationNotFoundError, InvalidDatesError } from '../errors'

type PatchReservationInput = {
  id: string,
  userId?: string,
  roomId?: string,
  checkInDate?: Date,
  checkOutDate?: Date,
  status?: "pending" | "confirmed" | "cancelled"
}

export class PatchReservationUseCase {
  constructor(private reservationRepo: InMemoryReservationRepository) {}

  async execute(input: PatchReservationInput): Promise<Reservation> {
    const existing = await this.reservationRepo.findById(input.id)

    if (!existing) {
      throw new ReservationNotFoundError()
    }

    // Apply changes comming from the input
    const updated = new Reservation({
      id: input.id,
      userId: input.userId ?? existing.userId,
      roomId: input.roomId ?? existing.roomId,
      checkInDate: input.checkInDate ?? existing.checkInDate,
      checkOutDate: input.checkOutDate ?? existing.checkOutDate,
      status: input.status ?? existing.status
    })

    if (updated.checkOutDate <= updated.checkInDate) {
      throw new InvalidDatesError()
    }

    await this.reservationRepo.save(updated)
    return updated
  }
}