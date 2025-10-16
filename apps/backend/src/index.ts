import express from 'express'
import bodyParser from 'body-parser'

// Imports from domain (using relative path to source in monorepo)
import { InMemoryReservationRepository } from '../../../domain/src/services/InMemoryReservationRepository'
import { CreateReservationUseCase } from '../../../domain/src/use-cases/create-reservation.use-case'
import { InvalidDatesError, OverlappingReservationError } from '../../../domain/src/errors'

const app = express()
app.use(bodyParser.json())

const repo = new InMemoryReservationRepository()
const createReservation = new CreateReservationUseCase(repo)

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

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})