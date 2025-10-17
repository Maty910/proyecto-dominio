import express from 'express'
// use express.json() instead of body-parser to avoid missing type declarations

import { Reservation } from "@hotel/domain/src/entities/Reservation"

// Imports from domain (using relative path to source in monorepo)
import { InMemoryReservationRepository } from "@hotel/domain/src/services/InMemoryReservationRepository"
import { CreateReservationUseCase } from "@hotel/domain/src/use-cases/create-reservation.use-case"
import { InvalidDatesError, OverlappingReservationError } from "@hotel/domain/src/errors"

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

const repo = new InMemoryReservationRepository()
const createReservation = new CreateReservationUseCase(repo)

app.get("/", (req, res) => {
  const reservation = new Reservation({
    id: "1",
    userId: "user-1",
    roomId: "room-1",
    checkInDate: new Date("2025-10-20"),
    checkOutDate: new Date("2025-10-25"),
    status: "confirmed"
  })


  res.json({
    message: "Reservation created successfully!",
    reservation,
  })
})

app.post("/reservations", async (req, res) => {
  try {
    const { id, userId, roomId, checkInDate, CheckOutDate, status } = req.body

    //basic validation & parsing dates
    if (!id || !userId || !roomId || !checkInDate || !CheckOutDate || !status) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const reservation = await createReservation.execute({
      id,
      userId,
      roomId,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(CheckOutDate),
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