import {Component, Input, OnInit} from '@angular/core';
import {RoomType} from "../../../../../../_models/room-type";
import {RoomTypeService} from "../../../../../../_services/room-type.service";
import {RoomDetail} from "../../../../../../_models/room-detail";
import {CryptoService} from "../../../../../../_services/crypto.service";
import {CartService} from "../../../../../../_services/cart.service";

@Component({
  selector: 'app-room-type-card',
  templateUrl: './room-type-card.component.html',
  styleUrls: ['./room-type-card.component.scss']
})
export class RoomTypeCardComponent implements OnInit {
  @Input() roomType: RoomType
  @Input() hotelId: number
  roomDetail: RoomDetail
  iconMale = 'fa fa-male'
  modal = ''

  constructor(private roomTypeService: RoomTypeService,
              private cryptoService: CryptoService,
              private cartService: CartService) {
    this.modal = `#room-type-image-modal-${this.roomType?.id}`
  }

  ngOnInit(): void {
    this.roomTypeService.getRoomDetailByRoomTypeId(this.cryptoService.set('06052000', this.roomType.id))
      .subscribe(rs => {
        this.roomDetail = rs['data']
      })
  }

  addToCart() {
    this.cartService.addToCart(this.hotelId, this.roomType.id, 1).subscribe(rs => {
      this.cartService.updateCarts()
        alert('An item has been added to your cart!')
      },
      err => {
        alert('You can not add more than 2 item!')
      })
  }
}
