"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresUserRepository = void 0;
const User_1 = require("@hotel/domain/src/entities/User");
/* Implementación concreta de UserRepository usando PostgreSQL. */
class PostgresUserRepository {
    constructor(pool) {
        this.pool = pool;
    }
    /**
     * Guarda o actualiza un usuario en PostgreSQL.
     * Usa UPSERT (INSERT ... ON CONFLICT) para ser idempotente:
     * si el usuario existe, lo actualiza; si no existe, lo crea.
     */
    async save(user) {
        const query = `
      INSERT INTO users (id, email, password, role)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) 
      DO UPDATE SET 
        email = EXCLUDED.email,
        password = EXCLUDED.password,
        role = EXCLUDED.role
    `;
        await this.pool.query(query, [
            user.id,
            user.email,
            user.passwordHash,
            user.role
        ]);
    }
    /**
     * Busca un usuario por su email.
     * Retorna null si no lo encuentra (no lanza error).
     */
    async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await this.pool.query(query, [email]);
        if (result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        return new User_1.User({ id: row.id, email: row.email, passwordHash: row.password, role: row.role });
    }
    /**
     * Busca un usuario por su ID.
     * Retorna null si no lo encuentra.
     */
    async findById(id) {
        const query = 'SELECT * FROM users WHERE id = $1';
        const result = await this.pool.query(query, [id]);
        if (result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        return new User_1.User({ id: row.id, email: row.email, passwordHash: row.password, role: row.role });
    }
}
exports.PostgresUserRepository = PostgresUserRepository;
