export type ReservationStatus = "pending" | "confirmed" | "cancelled"

interface ReservationProps {
  id: string;
  userId: string;
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date;
  status: ReservationStatus
}

export class Reservation {
  public readonly id: string;
  public readonly userId: string;
  public readonly roomId: string;
  public readonly checkInDate: Date;
  public readonly checkOutDate: Date;
  public status: ReservationStatus;

  constructor(props: ReservationProps) {
    if (props.checkOutDate <= props.checkInDate) {
      throw new Error("Check-Out date must be after Check-In date")
    }

    this.id = props.id;
    this.userId = props.userId;
    this.roomId = props.roomId;
    this.checkInDate = props.checkInDate;
    this.checkOutDate = props.checkOutDate;
    this.status = props.status;
  }
}