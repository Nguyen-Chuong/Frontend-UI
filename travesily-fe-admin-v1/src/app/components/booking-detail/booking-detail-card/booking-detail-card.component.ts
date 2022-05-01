import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BookingDetail } from 'src/app/_models/booking-detail';
import { Room } from 'src/app/_models/room';
import { CryptoService } from 'src/app/_services/crypto.service';
import { HotelService } from 'src/app/_services/hotel.service';

@Component({
  selector: 'app-booking-detail-card',
  templateUrl: './booking-detail-card.component.html',
  styleUrls: ['./booking-detail-card.component.scss']
})
export class BookingDetailCardComponent implements OnInit {

  @Input() bookingDetail: BookingDetail = new BookingDetail()
  roomDetail: Room = new Room()

  constructor(private hotelService: HotelService,
    private cryptoService: CryptoService,
    config: NgbModalConfig,
    private modalService: NgbModal) {
    config.keyboard = false;
  }

  ngOnInit(): void {
    if (this.bookingDetail.id) {
      this.hotelService.getRoomDetailByRoomTypeId(this.cryptoService.set('06052000', this.bookingDetail?.roomTypeId)).subscribe(
        rs => {
          this.roomDetail = rs['data']
        }
      )
    }
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  filterFacility(ele) {
    return ele['name']
  }

}
