import { Reservation } from '../entities/Reservation'
import { ReservationRepository } from './ReservationRepository'

export class InMemoryReservationRepository implements ReservationRepository {
  private items: Reservation[] = [];

  async save(reservation: Reservation): Promise<void> {
    this.items.push(reservation)
  }

  async findById(id: string): Promise<Reservation | null> {
    const reservation = this.items.find(r => r.id === id)
    return reservation || null
  }

  async findAll(): Promise<Reservation[]> {
    return this.items
  }

  async findByRoomId(roomId: string): Promise<Reservation[]> {
    return this.items.filter(r => r.roomId === roomId)
  }

  async delete(id: string): Promise<void> {
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (this.items[i].id === id) {
        this.items.splice(i, 1)
      }
    }
  }

  clear() {
    this.items = []
  }
}