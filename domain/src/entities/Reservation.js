"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
const errors_1 = require("../errors");
class Reservation {
    constructor(props) {
        if (props.checkOutDate <= props.checkInDate) {
            throw new errors_1.InvalidDatesError();
        }
        this.id = props.id;
        this.userId = props.userId;
        this.roomId = props.roomId;
        this.checkInDate = props.checkInDate;
        this.checkOutDate = props.checkOutDate;
        this.status = props.status;
    }
}
exports.Reservation = Reservation;
