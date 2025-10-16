import { Reservation } from '../entities/Reservation'

export interface ReservationRepository {
  save(reservation: Reservation): Promise<void>;
  findByRoomId(roomId: string): Promise<Reservation[]>;
}