import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../../../../../_models/booking";
import {BookingDetail} from "../../../../../../_models/booking-detail";
import {Hotel} from "../../../../../../_models/hotel";
import {Account} from "../../../../../../_models/account";

@Component({
  selector: 'app-transaction-booking-detail',
  templateUrl: './transaction-booking-detail.component.html',
  styleUrls: ['./transaction-booking-detail.component.scss']
})
export class TransactionBookingDetailComponent implements OnInit {
  @Input() booking: Booking = new Booking()
  @Input() bookingDetails: BookingDetail[] = []
  @Input() hotel: Hotel = new Hotel()
  @Input() account: Account = new Account()
  constructor() { }

  ngOnInit(): void {
  }

}
