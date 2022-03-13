import {Hotel} from "./hotel";

export class Booking {
id: number
  checkIn: string
  checkOut: string
  status: number
  reviewStatus: number
  hotel: Hotel
  totalPaid: number
  username: string
}
