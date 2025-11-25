import { Pool, PoolConfig } from 'pg'

/**
 * Factory para crear un pool de conexiones a PostgreSQL.
 * 
 * El pool maneja automáticamente múltiples conexiones,
 * reutilizándolas para mejor performance.
 * 
 * Sigue el patrón 12 Factor App: configuración mediante variables de entorno.
 */

export const createDatabasePool = (config?: PoolConfig): Pool => {
  const poolConfig: PoolConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'hotel_reservations',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000,
    ...config,
  }

  const pool = new Pool(poolConfig)

  pool.on('connect', () => {
    console.log('✅ PostgreSQL connection established')
  })

  pool.on('error', (err) => {
    console.error('❌ Unexpected error in the PostgreSQL pool: ', err)
  })

  return pool
}

/**
 * Verifica que la conexión a la base de datos funcione.
 * Útil para health checks.
 */

export const checkDatabaseHealth = async (pool: Pool): Promise<boolean> => {
  try {
    const result = await pool.query('SELECT NOW()')
    return result.rows.length > 0
  } catch (error) {
    console.error('Database healthcheck failed: ', error)
    return false
  }
}

/**
 * Cierra todas las conexiones del pool.
 * IMPORTANTE: llamar esto cuando la aplicación se apague.
 */

export const closeDatabasePool = async (pool: Pool): Promise<void> => {
  try {
    await pool.end()
    console.log('✅ Connection Pool closed successfully')
  } catch (error) {
    console.error('❌ Error closing the pool: ', error)
    throw error
  }
}