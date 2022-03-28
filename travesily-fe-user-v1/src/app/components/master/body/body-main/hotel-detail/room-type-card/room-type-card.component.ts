import {Component, Input, OnInit} from '@angular/core';
import {RoomType} from "../../../../../../_models/room-type";
import {RoomTypeService} from "../../../../../../_services/room-type.service";
import {RoomDetail} from "../../../../../../_models/room-detail";
import {CryptoService} from "../../../../../../_services/crypto.service";
import {CartService} from "../../../../../../_services/cart.service";
import {StorageService} from "../../../../../../_services/storage.service";
import {SearchFilter} from "../../../../../../_models/search-filter";
import {Router} from "@angular/router";
import {Cart} from "../../../../../../_models/cart";

@Component({
  selector: 'app-room-type-card',
  templateUrl: './room-type-card.component.html',
  styleUrls: ['./room-type-card.component.scss']
})
export class RoomTypeCardComponent implements OnInit {
  @Input() roomType: RoomType
  @Input() hotelId: number
  roomDetail: RoomDetail = new RoomDetail()
  iconMale = 'fa fa-male'
  filter: SearchFilter = new SearchFilter()
  modal = ''
  carts: Cart[] = []

  constructor(private roomTypeService: RoomTypeService, private cryptoService: CryptoService, private cartService: CartService, private storageService: StorageService, private router: Router) {
    this.modal = `#room-type-image-modal-${this.roomType?.id}`
    this.filter = this.storageService.searchFilter
    this.roomDetail.listImage = []
    if (storageService.authToken)
      this.cartService.getCarts().subscribe({
        next: carts => {
          this.carts = carts
          if (this.carts.length > 0) {
            this.filter.roomNumber = 1
          }
        }
      })
  }

  ngOnInit(): void {
    this.roomTypeService.getRoomDetailByRoomTypeId(this.cryptoService.set('06052000', this.roomType.id)).subscribe(rs => {
        this.roomDetail = rs['data']
      })
  }

  addToCart() {
    if (!this.storageService.authToken)
      this.router.navigate(['/authentication/login'], {
        queryParams: {
          url: this.router.url
        }
      })
    else
      this.cartService.addToCart(this.hotelId, this.roomType.id, this.filter.roomNumber, this.filter.guestNumber, this.filter.from, this.filter.to).subscribe(rs => {
          this.cartService.updateCarts()
          alert('An item has been added to your cart!')
        },
        err => alert('You can not add more than 2 item!'))
  }

  bookNow() {
    if (!this.storageService.authToken)
      this.router.navigate(['/authentication/login'], {
        queryParams: {
          url: this.router.url
        }
      })
    else
      this.cartService.clearCart().subscribe({
        next: value => {
          this.cartService.addToCart(this.hotelId, this.roomType.id, this.filter.roomNumber, this.filter.guestNumber, this.filter.from, this.filter.to).subscribe(rs => {
              this.cartService.updateCarts()
              this.router.navigateByUrl('/book/booking-info')
            },
            err => alert('You can not add more than 2 item!'))
        }
      })
  }
}
