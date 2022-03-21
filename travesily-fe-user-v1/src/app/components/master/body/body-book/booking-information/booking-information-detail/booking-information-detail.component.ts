import {Component, Input, OnInit} from '@angular/core';
import {Account} from "../../../../../../_models/account";
import {Cart} from "../../../../../../_models/cart";
import {RoomDetail} from "../../../../../../_models/room-detail";
import {Hotel} from "../../../../../../_models/hotel";
import {BookingInformationDetail} from "../../../../../../_models/booking-information-detail";

@Component({
  selector: 'app-booking-information-detail',
  templateUrl: './booking-information-detail.component.html',
  styleUrls: ['./booking-information-detail.component.scss']
})
export class BookingInformationDetailComponent implements OnInit {
  @Input() roomDetails: RoomDetail[] = []
  @Input() hotel: Hotel = new Hotel()
  @Input() bookingInformationDetails: BookingInformationDetail[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
