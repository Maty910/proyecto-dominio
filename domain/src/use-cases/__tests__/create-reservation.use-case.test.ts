import { describe, it, expect, beforeEach } from "vitest"
import { CreateReservationUseCase } from "../create-reservation.use-case"
import { Reservation } from "../../entities/Reservation"
import { InMemoryReservationRepository } from '../../services/InMemoryReservationRepository'
import { InvalidDatesError, OverlappingReservationError } from "../../errors"

describe("CreateReservationUseCase - overlaps", () => {
  let repo: InMemoryReservationRepository;
  let useCase: CreateReservationUseCase;

  beforeEach(() => {
    repo = new InMemoryReservationRepository();
    useCase = new CreateReservationUseCase(repo);
    repo.clear();
  })

  it("Should throw when new reservation overlaps existing for same room", async () => {
    // existing reservation: 20 -> 25
    await useCase.execute({
      id: "existing",
      userId: "u1",
      roomId: "room-1",
      checkInDate: new Date("2025-10-20"),
      checkOutDate: new Date("2025-10-25"),
      status: "confirmed",
    })

    // test overlapping scenarios
    await expect(
      useCase.execute({
        id: "new",
        userId: "u2",
        roomId: "room-1",
        checkInDate: new Date("2025-10-24"),
        checkOutDate: new Date("2025-10-27"),
        status: "pending",
      })
    ).rejects.toThrowError(OverlappingReservationError)
  }),

  it("Should create a reservation successfully", async () => {
    const reservation = await useCase.execute({
      id: "1",
      userId: "user-1",
      roomId: "room-1",
      checkInDate: new Date("2025-10-20"),
      checkOutDate: new Date("2025-10-25"),
      status: "confirmed"
    })

    expect(reservation).toBeInstanceOf(Reservation)
    expect(reservation.userId).toBe("user-1")
    expect(reservation.status).toBe("confirmed")
  })

  it("Should throw an error if check-out date is before check-in date", async () => {
    await expect(
      useCase.execute({
        id: "2",
        userId: "user-2",
        roomId: "room-2",
        checkInDate: new Date("2025-10-25"),
        checkOutDate: new Date("2025-10-20"),
        status: "pending"
      })
    ).rejects.toThrowError(InvalidDatesError)
  })
})