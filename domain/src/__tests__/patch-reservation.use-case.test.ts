import { describe, it,expect, beforeEach } from "vitest"
import { InMemoryReservationRepository } from "../services/InMemoryReservationRepository"
import { Reservation } from "../entities/Reservation"
import { PatchReservationUseCase } from "../use-cases/patch-reservation.use-case"
import { InvalidDatesError, ReservationNotFoundError } from "../errors"

describe("PatchReservationUseCase", () => {
  let repo: InMemoryReservationRepository
  let useCase: PatchReservationUseCase
  let baseReservation: Reservation

  beforeEach(async () => {
    repo = new InMemoryReservationRepository()
    useCase = new PatchReservationUseCase(repo)

    baseReservation = new Reservation({
      id: "1",
      userId: "u1",
      roomId: "r1",
      checkInDate: new Date("2025-12-01"),
      checkOutDate: new Date("2025-12-10"),
      status: "confirmed"
    })

    await repo.save(baseReservation)
  })

  it("Should update partially an existing reservation", async () => {
    const updated = await useCase.execute({
      id: "1",
      status: "cancelled"
    })

    expect(updated.status).toBe("cancelled")

    const stored = await repo.findById("1")
    expect(stored?.status).toBe("cancelled")
  })

  it("Should keep untouched fields", async () => {
    const updated = await useCase.execute({
      id: "1",
      checkOutDate: new Date("2025-12-15")
    })

    expect(updated.checkInDate).toEqual(baseReservation.checkInDate)
    expect(updated.checkOutDate.toISOString()).toBe("2025-12-15T00:00:00.000Z")
  })

  it("Should throw an error if reservation does not exist", async () => {
    await expect(
      useCase.execute({ id:"999", status: "cancelled" })
    ).rejects.toThrow(ReservationNotFoundError)
  })

  it("Should throw an error if dates are invalid", async () => {
    await expect(
      useCase.execute({
        id: "1",
        checkInDate: new Date("2025-12-20"),
        checkOutDate: new Date("2025-12-10")
      })
    ).rejects.toThrow(InvalidDatesError)
  })
})
