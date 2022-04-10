import {BookingDetail} from "./booking-detail";

export class BookingRequest {
  bookedQuantity: number;
  bookingDate: Date;
  checkIn: Date;
  checkOut: Date;
  reviewStatus: number;
  status: number;
  hotelId: number;
  userId: number
  bookingDetail: BookingDetail[]
  otherRequirement: string
  type: number
}
