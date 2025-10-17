import { Reservation } from '../entities/Reservation'
import { ReservationRepository } from '../services/ReservationRepository'

export class GetReservationsByRoomUseCase {
  constructor(private repo: ReservationRepository) {}
  
  async execute(roomId: string): Promise<Reservation[]> {
    return this.repo.findByRoomId(roomId)
  }
}