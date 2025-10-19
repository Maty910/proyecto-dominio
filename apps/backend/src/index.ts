import express from 'express'

import { Reservation } from "@hotel/domain/src/entities/Reservation"
import { InMemoryReservationRepository } from "@hotel/domain/src/services/InMemoryReservationRepository"
import { CreateReservationUseCase } from "@hotel/domain/src/use-cases/create-reservation.use-case"
import { GetReservationsByRoomUseCase } from "@hotel/domain/src/use-cases/get-reservations-by-room.use-case"
import { UpdateReservationUseCase } from "@hotel/domain/src/use-cases/update-reservation.use-case"
import { PatchReservationUseCase } from "@hotel/domain/src/use-cases/patch-reservation.use-case"

import { InvalidDatesError, OverlappingReservationError, ReservationNotFoundError } from "@hotel/domain/src/errors"

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
      checkOutDate: reservation.checkOutDate.toISOString(),
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

app.put("/reservations/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { userId, roomId, checkInDate, checkOutDate, status } = req.body

    if (!userId || !roomId || !checkInDate || !checkOutDate || !status) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const updatedReservation = await new (class {
      async run() {
        const updateUseCase = new UpdateReservationUseCase(repo)
        return updateUseCase.execute({
          id,
          userId,
          roomId,
          checkInDate: new Date(checkInDate),
          checkOutDate: new Date(checkOutDate),
          status
        })
      }
    })().run()

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
      return res.status(400).json({ message: err.message })
    }
    if (err instanceof ReservationNotFoundError) {
      return res.status(404).json({ message: err.message })
    }

    console.error(err)
    return res.status(500).json({ message: "Internal server error" })
  }
})

app.patch("/reservations/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { userId, roomId, checkInDate, checkOutDate, status } = req.body

    const patchUseCase = new PatchReservationUseCase(repo)
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
    return res.status(404).json({ message: err.message })
  }
    if (err instanceof InvalidDatesError) {
      return res.status(400).json({ message: err.message })
    }

    console.error(err)
    return res.status(500).json({ message: err.message })
  }
})

app.delete("/reservations/:id", async (req, res) => {
  const { id } = req.params
  const existing = await repo.findById(id)

  if (!existing) {
    return res.status(404).json({ message: "Reservation not found" })
  }

  await repo.delete(id)
  return res.status(200).json({ message: "Reservation deleted" })
})

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})