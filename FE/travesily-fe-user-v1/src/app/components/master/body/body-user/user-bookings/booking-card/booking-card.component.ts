import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../../../../../_models/booking";
import {BookingService} from "../../../../../../_services/booking.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss']
})
export class BookingCardComponent implements OnInit {
  @Input() booking: Booking = new Booking()

  constructor(private bookingService: BookingService, private router: Router) {
  }

  ngOnInit(): void {

  }

  viewDetail() {
    this.router.navigate(['/user/booking-detail'],{queryParams:{bookingId: this.booking.id}})
  }
}
