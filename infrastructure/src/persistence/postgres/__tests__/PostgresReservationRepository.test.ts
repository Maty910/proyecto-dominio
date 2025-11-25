import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { Pool } from 'pg';
import { PostgresReservationRepository } from '../repositories/PostgresReservationRepository';
import { Reservation } from '@hotel/domain/src/entities/Reservation';

describe('PostgresReservationRepository - Tests de Integración', () => {
  let pool: Pool;
  let repository: PostgresReservationRepository;

  beforeAll(async () => {
    pool = new Pool({
      host: process.env.DB_TEST_HOST || 'localhost',
      port: parseInt(process.env.DB_TEST_PORT || '5433'),
      user: process.env.DB_TEST_USER || 'postgres',
      password: process.env.DB_TEST_PASSWORD || 'postgres123',
      database: process.env.DB_TEST_NAME || 'hotel_test',
    });

    // Crear tablas necesarias
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS reservations (
        id VARCHAR(255) PRIMARY KEY,
        room_id VARCHAR(255) NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        check_in_date DATE NOT NULL,
        check_out_date DATE NOT NULL,
        status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Crear índices para optimizar búsquedas
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_reservations_room_id 
      ON reservations(room_id);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_reservations_dates 
      ON reservations(check_in_date, check_out_date);
    `);

    repository = new PostgresReservationRepository(pool);
  });

  beforeEach(async () => {
    await pool.query('DELETE FROM reservations');
    await pool.query('DELETE FROM users');

    // Crear usuario de prueba para las foreign keys
    await pool.query(
      `INSERT INTO users (id, email, password, role) 
      VALUES ($1, $2, $3, $4)`,
      ['user-123', 'test@example.com', 'hashed_pass', 'customer']
    );
  });

  afterAll(async () => {
    await pool.query('DROP TABLE IF EXISTS reservations CASCADE');
    await pool.query('DROP TABLE IF EXISTS users CASCADE');
    await pool.end();
  });

  describe('save', () => {
    it('debería guardar una nueva reserva', async () => {
      // Arrange
      const reservation = new Reservation({
        id: 'res-1',
        roomId: 'room-101',
        userId: 'user-123',
        checkInDate: new Date('2025-12-01'),
        checkOutDate: new Date('2025-12-05'),
        status: 'confirmed'
      });

      // Act
      await repository.save(reservation);

      // Assert
      const result = await pool.query(
        'SELECT * FROM reservations WHERE id = $1',
        ['res-1']
      );
      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].room_id).toBe('room-101');
      expect(result.rows[0].status).toBe('confirmed');
    });

    it('debería actualizar una reserva existente', async () => {
      // Arrange
      const reservation = new Reservation({
        id: 'res-1',
        roomId: 'room-101',
        userId: 'user-123',
        checkInDate: new Date('2025-12-01'),
        checkOutDate: new Date('2025-12-05'),
        status: 'confirmed'
      });
      await repository.save(reservation);

      // Act - Actualizar
      const updatedReservation = new Reservation({
        id: 'res-1',
        roomId: 'room-102', // Cambio de habitación
        userId: 'user-123',
        checkInDate: new Date('2025-12-10'),
        checkOutDate: new Date('2025-12-15'),
        status: 'cancelled'
      });
      await repository.save(updatedReservation);

      // Assert
      const result = await pool.query(
        'SELECT * FROM reservations WHERE id = $1',
        ['res-1']
      );
      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].room_id).toBe('room-102');
      expect(result.rows[0].status).toBe('cancelled');
    });
  });

  describe('findById', () => {
    it('debería encontrar una reserva por id', async () => {
      // Arrange
      const reservation = new Reservation({
        id: 'res-1',
        roomId: 'room-101',
        userId: 'user-123',
        checkInDate: new Date('2025-12-01'),
        checkOutDate: new Date('2025-12-05'),
        status: 'confirmed'
      });
      await repository.save(reservation);

      // Act
      const found = await repository.findById('res-1');

      // Assert
      expect(found).not.toBeNull();
      expect(found?.id).toBe('res-1');
      expect(found?.roomId).toBe('room-101');
    });

    it('debería retornar null cuando la reserva no existe', async () => {
      // Act
      const found = await repository.findById('non-existent');

      // Assert
      expect(found).toBeNull();
    });
  });

  describe('findByRoomId', () => {
    it('debería encontrar todas las reservas de una habitación', async () => {
      // Arrange
      const res1 = new Reservation({
        id: 'res-1',
        roomId: 'room-101',
        userId: 'user-123',
        checkInDate: new Date('2025-12-01'),
        checkOutDate: new Date('2025-12-05'),
        status: 'confirmed'
      });
      const res2 = new Reservation({
        id: 'res-2',
        roomId: 'room-101',
        userId: 'user-123',
        checkInDate: new Date('2025-12-10'),
        checkOutDate: new Date('2025-12-15'),
        status: 'confirmed'
      });
      const res3 = new Reservation({
        id: 'res-3',
        roomId: 'room-102', // Habitación diferente
        userId: 'user-123',
        checkInDate: new Date('2025-12-01'),
        checkOutDate: new Date('2025-12-05'),
        status: 'confirmed'
      });

      await repository.save(res1);
      await repository.save(res2);
      await repository.save(res3);

      // Act
      const reservations: Reservation[] = await repository.findByRoomId('room-101');

      // Assert
      expect(reservations).toHaveLength(2);
      expect(reservations.every((r) => r.roomId === 'room-101')).toBe(true);
    });

    it('debería retornar array vacío cuando no hay reservas', async () => {
      // Act
      const reservations = await repository.findByRoomId('room-999');

      // Assert
      expect(reservations).toHaveLength(0);
    });
  });

  describe('findOverlapping', () => {
    it('debería encontrar reservas que se solapan con un rango de fechas', async () => {
      // Arrange - Reserva existente del 5 al 10 de diciembre
      const existing = new Reservation({
        id: 'res-1',
        roomId: 'room-101',
        userId: 'user-123',
        checkInDate: new Date('2025-12-05'),
        checkOutDate: new Date('2025-12-10'),
        status: 'confirmed'
      });
      await repository.save(existing);

      // Act - Buscar reserva del 8 al 12 (se solapa con la existente)
      const overlapping = await repository.findOverlapping(
        'room-101',
        new Date('2025-12-08'),
        new Date('2025-12-12')
      );

      // Assert
      expect(overlapping).toHaveLength(1);
      expect(overlapping[0].id).toBe('res-1');
    });

    it('NO debería encontrar reservas que no se solapan', async () => {
      // Arrange - Reserva del 5 al 10
      const existing = new Reservation({
        id: 'res-1',
        roomId: 'room-101',
        userId: 'user-123',
        checkInDate: new Date('2025-12-05'),
        checkOutDate: new Date('2025-12-10'),
        status: 'confirmed'
      })
      await repository.save(existing);

      // Act - Buscar del 15 al 20 (NO se solapa)
      const overlapping = await repository.findOverlapping(
        'room-101',
        new Date('2025-12-15'),
        new Date('2025-12-20')
      );

      // Assert
      expect(overlapping).toHaveLength(0);
    });

    it('debería ignorar reservas canceladas al buscar solapamientos', async () => {
      // Arrange - Reserva cancelada
      const cancelled = new Reservation({
        id: 'res-1',
        roomId: 'room-101',
        userId: 'user-123',
        checkInDate: new Date('2025-12-05'),
        checkOutDate: new Date('2025-12-10'),
        status: 'cancelled'
      });
      await repository.save(cancelled);

      // Act - Buscar en el mismo rango
      const overlapping = await repository.findOverlapping(
        'room-101',
        new Date('2025-12-08'),
        new Date('2025-12-12')
      );

      // Assert - No debería encontrar nada porque está cancelada
      expect(overlapping).toHaveLength(0);
    });
  });
});