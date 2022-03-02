import {Component, Input, OnInit} from '@angular/core';
import {BookingDetail} from "../../../../../../../_models/booking-detail";
import {RoomTypeService} from "../../../../../../../_services/room-type.service";
import {first} from "rxjs";
import {RoomDetail} from "../../../../../../../_models/room-detail";

@Component({
  selector: 'app-user-booking-detail-card',
  templateUrl: './user-booking-detail-card.component.html',
  styleUrls: ['./user-booking-detail-card.component.scss']
})
export class UserBookingDetailCardComponent implements OnInit {
  @Input() bookingDetail: BookingDetail = new BookingDetail()
  roomDetail: RoomDetail = new RoomDetail()

  constructor(private roomTypeService: RoomTypeService) {

  }

  ngOnInit(): void {
    if (this.bookingDetail.id) {
      this.roomTypeService.getRoomDetailByRoomTypeId(this.bookingDetail?.id).pipe(first()).subscribe(
        rs => {
          this.roomDetail = rs['data']
        }
      )
    }
  }

  filterFacility(ele){
    return ele['name']
  }

}
