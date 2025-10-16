import { Reservation } from '../entities/Reservation'
import { ReservationRepository } from './ReservationRepository'

export class InMemoryReservationRepository implements ReservationRepository {
  private items: Reservation[] = [];

  async save(reservation: Reservation): Promise<void> {
    this.items.push(reservation)
  }

  async findByRoomId(roomId: string): Promise<Reservation[]> {
    return this.items.filter(r => r.roomId === roomId)
  }

  clear() {
    this.items = []
  }
}