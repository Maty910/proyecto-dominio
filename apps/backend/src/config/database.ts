import { Pool } from 'pg'

let pool: Pool | null = null

export const getDatabasePool = (): Pool => {
  if (!pool) {
    pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres123',
      database: process.env.DB_NAME || 'hotel_reservations',
      max: 20, // máximo de conexíones en el pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    })

    pool.on('connect', () => {
      console.log('✅ New connection to PostgreSQL established')
    })

    pool.on('error', (err: Error) => {
      console.error('❌ Unexpected error in PostgreSQL pool: ', err)
      process.exit(-1)
    })

    console.log('PostgreSQL pool initialized')
  }

  return pool
}

export const closeDatabasePool = async (): Promise<void> => {
  if (pool) {
    await pool.end()
    pool = null
    console.log('✅ PostgreSQL pool closed successfully')
  }
}