import { describe, it, expect, beforeEach } from "vitest"
import { CreateReservationUseCase } from "../create-reservation.use-case"
import { Reservation } from "../../entities/Reservation"
import { InMemoryReservationRepository } from '../../services/InMemoryReservationRepository'

describe("CreateReservationUseCase - overlaps", () => {
  let repo: InMemoryReservationRepository;
  let useCase: CreateReservationUseCase;

  beforeEach(() => {
    repo = new InMemoryReservationRepository();
    useCase = new CreateReservationUseCase(repo);
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
    await expect(() => useCase.execute({
      id: "new",
      userId: "u2",
      roomId: "room-1",
      checkInDate: new Date("2025-10-24"),
      checkOutDate: new Date("2025-10-27"),
      status: "pending",
    })).rejects.toThrow("Reservation dates overlap with existing booking for this room")
  }),

  it("Should create a reservation successfully", async () => {
    const repo = new InMemoryReservationRepository()
    const useCase = new CreateReservationUseCase(repo)

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
    const repo = new InMemoryReservationRepository()
    const useCase = new CreateReservationUseCase(repo)

    await expect(
      useCase.execute({
        id: "2",
        userId: "user-2",
        roomId: "room-2",
        checkInDate: new Date("2025-10-25"),
        checkOutDate: new Date("2025-10-20"),
        status: "pending"
      })
    ).rejects.toThrowError("Check-out date must be after check-in date")
  })
})