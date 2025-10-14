import { describe, it, expect } from "vitest"
import { CreateReservationUseCase } from "../create-reservation.use-case"
import { Reservation } from "../../entities/Reservation"

describe("CreateReservationUseCase", () => {
  it("Should create a reservation successfully", () => {
    const useCase = new CreateReservationUseCase()

    const reservation = useCase.execute({
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

  it("Should throw an error if check-out date is before check-in date", () => {
    const useCase = new CreateReservationUseCase()

    expect(() => {
      useCase.execute({
        id: "2",
        userId: "user-2",
        roomId: "room-2",
        checkInDate: new Date("2025-10-25"),
        checkOutDate: new Date("2025-10-20"),
        status: "pending"
      })
    }).toThrow("Check-out date must be after check-in date")
  })
})