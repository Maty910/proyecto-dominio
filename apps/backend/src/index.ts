import express from 'express'
import cors from 'cors'
import { randomUUID } from "crypto"
import { Request, Response } from "express"

import { getDatabasePool, closeDatabasePool } from './config/database'

// Import simplificado desde infrastructure
import { PostgresReservationRepository } from '@hotel/infrastructure'

// Imports simplificados desde domain
import {
  CreateReservationUseCase,
  GetReservationsByRoomUseCase,
  UpdateReservationUseCase,
  PatchReservationUseCase,
  InvalidDatesError,
  OverlappingReservationError,
  ReservationNotFoundError
} from '@hotel/domain'

import authRoutes from './routes/auth'
import { authMiddleware } from './middlewares/auth'
import { MOCK_ROOMS } from "./data/rooms"

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const pool = getDatabasePool()
const repo = new PostgresReservationRepository(pool)

const createReservation = new CreateReservationUseCase(repo)
const getReservationsByRoom = new GetReservationsByRoomUseCase(repo)

app.use("/auth", authRoutes)

app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    database: "connected"
  })
})

app.get("/rooms", (req: Request, res: Response) => {
  res.json(MOCK_ROOMS)
})

app.get("/reservations/:roomId", async (req: Request, res: Response) => {
  const { roomId } = req.params
  const reservations = await getReservationsByRoom.execute(roomId)

  res.json(reservations)
})

app.get("/reservations", authMiddleware, async (req: Request, res: Response) => {
  const reservations = await repo.findByRoomId('')

  res.json(reservations)
})

app.post("/reservations", authMiddleware, async (req: any, res: Response) => {
  try {
    const { roomId, checkInDate, checkOutDate, status } = req.body
    const userId = req.user.id

    const id = randomUUID()

    //basic validation & parsing dates
    if (!id || !userId || !roomId || !checkInDate || !checkOutDate || !status) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const reservation = await createReservation.execute({
      id,
      userId,
      roomId,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      status
    })

    return res.status(201).json({
      id: reservation.id,
      userId: reservation.userId,
      roomId: reservation.roomId,
      checkInDate: reservation.checkInDate.toISOString(),
      checkOutDate: reservation.checkOutDate.toISOString(),
      status: reservation.status
    })
  } catch (err) {
    if (err instanceof InvalidDatesError) {
      return res.status(400).json({ message: (err as any) })
    }
    if (err instanceof OverlappingReservationError) {
      return res.status(409).json({ message: (err as any) })
    }
    console.error(err)
    return res.status(500).json({ message: "Internal server error" })
  }
})

app.put("/reservations/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { userId, roomId, checkInDate, checkOutDate, status } = req.body

    if (!userId || !roomId || !checkInDate || !checkOutDate || !status) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const updateUseCase = new UpdateReservationUseCase(repo)
    const updatedReservation = await updateUseCase.execute({
        id,
        userId,
        roomId,
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        status
      })

      return res.status(200).json({
        id: updatedReservation.id,
        userId: updatedReservation.userId,
        roomId: updatedReservation.roomId,
        checkInDate: updatedReservation.checkInDate.toISOString(),
        checkOutDate: updatedReservation.checkOutDate.toISOString(),
        status: updatedReservation.status
      })
  } catch (err: any) {
    // Domain errors
    if (err instanceof InvalidDatesError || err.message.includes("Check-out date")) {
      return res.status(400).json({ message: (err as any) })
    }
    if (err instanceof ReservationNotFoundError) {
      return res.status(404).json({ message: (err as any) })
    }

    console.error(err)
    return res.status(500).json({ message: "Internal server error" })
  }
})

app.patch("/reservations/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { userId, roomId, checkInDate, checkOutDate, status } = req.body

    const patchUseCase = new PatchReservationUseCase(repo as any)
    const updatedReservation = await patchUseCase.execute({
      id,
      userId,
      roomId,
      checkInDate: checkInDate ? new Date(checkInDate) : undefined,
      checkOutDate: checkOutDate ? new Date(checkOutDate) : undefined,
      status
    })

    return res.status(200).json({
      id: updatedReservation.id,
      userId: updatedReservation.userId,
      roomId: updatedReservation.roomId,
      checkInDate: updatedReservation.checkInDate.toISOString(),
      checkOutDate: updatedReservation.checkOutDate.toISOString(),
      status: updatedReservation.status
    })
  } catch (err: any) {
    if (err instanceof ReservationNotFoundError) {
    return res.status(404).json({ message: (err as any) })
  }
    if (err instanceof InvalidDatesError) {
      return res.status(400).json({ message: (err as any) })
    }

    console.error(err)
    return res.status(500).json({ message: (err as any) })
  }
})

app.delete("/reservations/:id", authMiddleware, async (req: any, res) => {
  const { id } = req.params
  const existing = await repo.findById(id)

  if (!existing) {
    return res.status(404).json({ message: "Reservation not found" })
  }

  if (req.user.role !== "admin" && req.user.id !== existing.userId) {
    return res.status(403).json({ message: "Forbidden" })
  }
  
  await repo.delete(id)
  return res.status(200).json({ message: "Reservation deleted" })
})

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server...')
  await closeDatabasePool()
  process.exit(0)
})

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})