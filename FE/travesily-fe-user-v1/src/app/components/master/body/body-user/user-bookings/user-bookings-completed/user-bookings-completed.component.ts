import { Component, OnInit } from '@angular/core';
import {BookingService} from "../../../../../../_services/booking.service";

@Component({
  selector: 'app-user-bookings-completed',
  templateUrl: './user-bookings-completed.component.html',
  styleUrls: ['./user-bookings-completed.component.scss']
})
export class UserBookingsCompletedComponent implements OnInit {

  constructor(private bookingService: BookingService) {
    
  }

  ngOnInit(): void {
  }

}
