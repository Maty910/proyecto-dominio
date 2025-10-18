import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryReservationRepository } from '../../services/InMemoryReservationRepository'
import { CreateReservationUseCase } from "../create-reservation.use-case"
import { UpdateReservationUseCase } from "../update-reservation.use-case"

describe("UpdateReservationUseCase", () => {
  let repo: InMemoryReservationRepository
  let createUseCase: CreateReservationUseCase
  let updateUseCase: UpdateReservationUseCase

  beforeEach(() => {
    repo = new InMemoryReservationRepository()
    createUseCase = new CreateReservationUseCase(repo)
    updateUseCase = new UpdateReservationUseCase(repo)
  })

  it("Should update an existing reservation", async () => {
    const created = await createUseCase.execute({
      id: "1",
      userId: "user-1",
      roomId: "room-1",
      checkInDate: new Date("2025-10-20"),
      checkOutDate: new Date("2025-10-22"),
      status: "confirmed"
    })

    const updated = await updateUseCase.execute({
      id: created.id,
      userId: "user-1",
      roomId: "room-1",
      checkInDate: new Date("2025-10-23"),
      checkOutDate: new Date("2025-10-25"),
      status: "confirmed"
    })

    expect(updated.checkInDate).toEqual(new Date("2025-10-23"))
    expect(updated.checkOutDate).toEqual(new Date("2025-10-25"))
  })

  it("Should throw error if reservation not found", async () => {
    await expect(
      updateUseCase.execute({
        id: "fake-id",
        userId: "user-1",
        roomId: "room-1",
        checkInDate: new Date(),
        checkOutDate: new Date(),
        status: "confirmed"
      })
    ).rejects.toThrow("Reservation not found")
  })
})