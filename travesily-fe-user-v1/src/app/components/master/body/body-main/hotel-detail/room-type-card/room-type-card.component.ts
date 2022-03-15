import {Component, Input, OnInit} from '@angular/core';
import {RoomType} from "../../../../../../_models/room-type";
import {RoomTypeService} from "../../../../../../_services/room-type.service";
import {RoomDetail} from "../../../../../../_models/room-detail";
import {CryptoService} from "../../../../../../_services/crypto.service";

@Component({
  selector: 'app-room-type-card',
  templateUrl: './room-type-card.component.html',
  styleUrls: ['./room-type-card.component.scss']
})
export class RoomTypeCardComponent implements OnInit {
  @Input() roomType: RoomType
  roomDetail: RoomDetail
  iconMale = 'fa fa-male'
  modal = ''

  constructor(private roomTypeService: RoomTypeService, private cryptoService: CryptoService) {
    this.modal = `#room-type-image-modal-${this.roomType?.id}`
  }

  ngOnInit(): void {
    this.roomTypeService.getRoomDetailByRoomTypeId(this.cryptoService.set('06052000', this.roomType.id))
      .subscribe(rs => {
        this.roomDetail = rs['data']
      })
  }

}
