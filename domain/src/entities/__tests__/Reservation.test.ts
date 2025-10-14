import { describe, it, expect } from "vitest"
import { Reservation } from "../Reservation"

describe("Reservation Entity", () => {
  it("Should create a valid reservation", () => {
    const reservation = new Reservation({
      id: "1",
      userId: "user-1",
      roomId: "room-1",
      checkInDate: new Date("2025-10-20"),
      checkOutDate: new Date("2025-10-25"),
      status: "confirmed",
    })

    expect(reservation).toBeInstanceOf(Reservation)
    expect(reservation.userId).toBe("user-1")
    expect(reservation.status).toBe("confirmed")
  })
})