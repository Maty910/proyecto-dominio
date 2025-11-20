import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { Pool } from 'pg';
import { PostgresUserRepository } from '../repositories/PostgresUserRepository';
import { User } from '@hotel/domain/src/entities/User';

describe('PostgresUserRepository - Tests de Integración', () => {
  let pool: Pool;
  let repository: PostgresUserRepository;

  // Configurar conexión a base de datos de pruebas antes de todos los tests
  beforeAll(async () => {
    pool = new Pool({
      host: process.env.DB_TEST_HOST || 'localhost',
      port: parseInt(process.env.DB_TEST_PORT || '5433'),
      user: process.env.DB_TEST_USER || 'postgres',
      password: process.env.DB_TEST_PASSWORD || 'postgres123',
      database: process.env.DB_TEST_NAME || 'hotel_test',
    });

    // Crear tabla de usuarios para tests
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    
    repository = new PostgresUserRepository(pool);
  });

  // Limpiar datos antes de cada test para que sean independientes
  beforeEach(async () => {
    await pool.query('DELETE FROM reservations');
    await pool.query('DELETE FROM users');
  });

  // Cerrar conexión después de todos los tests
  afterAll(async () => {
    await pool.query('DROP TABLE IF EXISTS reservations CASCADE');
    await pool.query('DROP TABLE IF EXISTS users CASCADE');
    await pool.end();
  });

  describe('save', () => {
    it('debería guardar un nuevo usuario en la base de datos', async () => {
      // Arrange (preparar)
      const user = new User({
        id: 'user-123',
        email: 'test@example.com',
        passwordHash: 'hashed_password',
        role: 'customer'
      });

      // Act (actuar)
      await repository.save(user);

      // Assert (verificar)
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [
        user.id,
      ]);
      
      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].email).toBe('test@example.com');
      expect(result.rows[0].role).toBe('customer');
    });

    it('debería actualizar un usuario existente', async () => {
      // Arrange
      const user = new User({
        id: 'user-123',
        email: 'test@example.com',
        passwordHash: 'hashed_password',
        role: 'customer'
      });
      await repository.save(user);

      // Act - Actualizar el usuario
      const updatedUser = new User({
        id: 'user-123',
        email: 'updated@example.com',
        passwordHash: 'new_hashed_password',
        role: 'admin'
      });
      await repository.save(updatedUser);

      // Assert
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [
        user.id,
      ]);
      
      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].email).toBe('updated@example.com');
      expect(result.rows[0].role).toBe('admin');
    });
  });

  describe('findByEmail', () => {
    it('debería encontrar un usuario por email', async () => {
      // Arrange
      const user = new User({
        id: 'user-123',
        email: 'test@example.com',
        passwordHash: 'hashed_password',
        role: 'customer'
      });
      await repository.save(user);

      // Act
      const foundUser = await repository.findByEmail('test@example.com');

      // Assert
      expect(foundUser).not.toBeNull();
      expect(foundUser?.id).toBe('user-123');
      expect(foundUser?.email).toBe('test@example.com');
    });

    it('debería retornar null cuando el usuario no existe', async () => {
      // Act
      const foundUser = await repository.findByEmail('nonexistent@example.com');

      // Assert
      expect(foundUser).toBeNull();
    });
  });

  describe('findById', () => {
    it('debería encontrar un usuario por id', async () => {
      // Arrange
      const user = new User({
        id: 'user-123',
        email: 'test@example.com',
        passwordHash: 'hashed_password',
        role: 'admin'
      });
      await repository.save(user);

      // Act
      const foundUser = await repository.findById('user-123');

      // Assert
      expect(foundUser).not.toBeNull();
      expect(foundUser?.id).toBe('user-123');
      expect(foundUser?.role).toBe('admin');
    });

    it('debería retornar null cuando el id no existe', async () => {
      // Act
      const foundUser = await repository.findById('non-existent-id');

      // Assert
      expect(foundUser).toBeNull();
    });
  });
});