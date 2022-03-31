import { Hotel } from './hotel';

export class Booking {
  id: number;
  checkIn: Date;
  checkOut: Date;
  status: number;
  reviewStatus: number;
  hotel: Hotel;
  totalPaid: number;
  username: string;
  totalDays: number;
  bookedQuantity: number
}
