"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresReservationRepository = void 0;
const domain_1 = require("@hotel/domain");
/**
 * Implementación de ReservationRepository usando PostgreSQL.
 *
 * Principios aplicados:
 * - Single Responsibility: solo maneja la persistencia de reservas
 * - Dependency Inversion: implementa la interfaz del dominio
 * - Open/Closed: cerrado para modificación, abierto para extensión
 */
class PostgresReservationRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async save(reservation) {
        const query = `
      INSERT INTO reservations (id, room_id, user_id, check_in_date, check_out_date, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id)
      DO UPDATE SET
        room_id = EXCLUDED.room_id,
        user_id = EXCLUDED.user_id,
        check_in_date = EXCLUDED.check_in_date,
        check_out_date = EXCLUDED.check_out_date,
        status = EXCLUDED.status
    `;
        await this.pool.query(query, [
            reservation.id,
            reservation.roomId,
            reservation.userId,
            reservation.checkInDate,
            reservation.checkOutDate,
            reservation.status,
        ]);
    }
    async findById(id) {
        const query = 'SELECT * FROM reservations WHERE id = $1';
        const result = await this.pool.query(query, [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return this.mapRowToReservation(result.rows[0]);
    }
    async findByRoomId(roomId) {
        const query = `
      SELECT * FROM reservations 
      WHERE room_id = $1 
      ORDER BY check_in_date ASC
    `;
        const result = await this.pool.query(query, [roomId]);
        return result.rows.map((row) => this.mapRowToReservation(row));
    }
    async findOverlapping(roomId, checkInDate, checkOutDate, excludeId) {
        let query = `
      SELECT * FROM reservations
      WHERE room_id = $1
        AND status != 'cancelled'
        AND check_in_date < $3
        AND check_out_date > $2
    `;
        const params = [roomId, checkInDate, checkOutDate];
        // Excluir una reserva específica (útil cuando actualizamos una reserva existente)
        if (excludeId) {
            query += ' AND id != $4';
            params.push(excludeId);
        }
        const result = await this.pool.query(query, params);
        return result.rows.map((row) => this.mapRowToReservation(row));
    }
    /**
     * Mapea una fila de PostgreSQL a una entidad Reservation del dominio.
     * Método privado para mantener la lógica de mapeo centralizada.
     */
    mapRowToReservation(row) {
        return new domain_1.Reservation({
            id: row.id,
            roomId: row.room_id,
            userId: row.user_id,
            checkInDate: new Date(row.check_in_date),
            checkOutDate: new Date(row.check_out_date),
            status: row.status
        });
    }
    async delete(id) {
        const query = 'DELETE FROM reservations WHERE id = $1';
        await this.pool.query(query, [id]);
    }
}
exports.PostgresReservationRepository = PostgresReservationRepository;
