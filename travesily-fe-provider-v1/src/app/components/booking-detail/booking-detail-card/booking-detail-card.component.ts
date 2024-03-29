import { Component, Input, OnInit } from '@angular/core';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BookingDetail } from 'src/app/_models/booking-detail';
import { Room } from 'src/app/_models/room';
import { CryptoService } from 'src/app/_services/crypto.service';
import { RoomService } from 'src/app/_services/room.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-booking-detail-card',
  templateUrl: './booking-detail-card.component.html',
  styleUrls: ['./booking-detail-card.component.scss']
})
export class BookingDetailCardComponent implements OnInit {
  @Input() bookingDetail: BookingDetail = new BookingDetail()
  roomDetail: Room = new Room()

  constructor(private roomTypeService: RoomService,
    private cryptoService: CryptoService,
    config: NgbModalConfig,
    private spinner: NgxSpinnerService) {
    config.keyboard = false;
  }

  ngOnInit(): void {
    if (this.bookingDetail.id) {
      this.roomTypeService.getRoomDetailByRoomTypeId(this.cryptoService.set('06052000', this.bookingDetail?.roomTypeId)).subscribe(
        rs => {
          this.roomDetail = rs['data']
          // check if data is loaded, hide it
          if(rs){
            this.spinner.hide();
          }
        }
      )
    }
  }

  filterFacility(ele) {
    return ele['name']
  }
}
