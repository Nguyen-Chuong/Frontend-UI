import { Booking } from 'src/app/_models/booking';

export class Review {
  id: number
  cleanliness: number
  facilities: number
  location: number
  reviewDetail: string
  reviewTitle: string
  service: number
  reviewId: number
  valueForMoney: number
  booking: Booking
  reviewDate: Date
}
