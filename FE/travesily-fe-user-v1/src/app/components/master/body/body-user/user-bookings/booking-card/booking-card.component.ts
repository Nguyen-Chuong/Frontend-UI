import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../../../../../_models/booking";

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss']
})
export class BookingCardComponent implements OnInit {
  @Input() booking: Booking = new Booking()

  constructor() {
  }

  ngOnInit(): void {
  }

}
