import express from 'express'

import { Reservation } from "@hotel/domain/src/entities/Reservation"
import { InMemoryReservationRepository } from "@hotel/domain/src/services/InMemoryReservationRepository"
import { CreateReservationUseCase } from "@hotel/domain/src/use-cases/create-reservation.use-case"
import { GetReservationsByRoomUseCase } from "@hotel/domain/src/use-cases/get-reservations-by-room.use-case"
import { InvalidDatesError, OverlappingReservationError } from "@hotel/domain/src/errors"

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

const repo = new InMemoryReservationRepository()
const createReservation = new CreateReservationUseCase(repo)
const getReservationsByRoom = new GetReservationsByRoomUseCase(repo)

app.get("/reservations/:roomId", async (req, res) => {
  const { roomId } = req.params
  const reservations = await getReservationsByRoom.execute(roomId)

  res.json(reservations)
})

app.post("/reservations", async (req, res) => {
  try {
    const { id, userId, roomId, checkInDate, checkOutDate, status } = req.body

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
      CheckOutDate: reservation.checkOutDate.toISOString(),
      status: reservation.status
    })
  } catch (err) {
    if (err instanceof InvalidDatesError) {
      return res.status(400).json({ message: err.message })
    }
    if (err instanceof OverlappingReservationError) {
      return res.status(409).json({ message: err.message })
    }
    console.error(err)
    return res.status(500).json({ message: "Internal server error" })
  }
})

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})