import { Hotel } from 'src/app/_models/hotel';

export class Booking {
 id: number
 bookDate: Date
 reviewStatus: number
 status: number
 hotel: Hotel
 UserId: number
 checkIn: Date
 checkOut: Date
 bookingDate: Date
 bookedQuantity: number
}
