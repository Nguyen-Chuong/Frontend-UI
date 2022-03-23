import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../../_services/cart.service";
import {Cart} from "../../../../_models/cart";
import {RoomTypeService} from "../../../../_services/room-type.service";
import {CryptoService} from "../../../../_services/crypto.service";
import {RoomDetail} from "../../../../_models/room-detail";
import {Router} from "@angular/router";
import {HotelService} from "../../../../_services/hotel.service";
import {Hotel} from "../../../../_models/hotel";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  carts: Cart[] = []
  roomDetails: RoomDetail[] = []
  hotel: Hotel = new Hotel()

  constructor(private cartService: CartService,
              private roomTypeService: RoomTypeService,
              private cryptoService: CryptoService,
              private router: Router,
              private hotelService: HotelService) {
    this.cartService.getCarts().subscribe({
        next: value => {
          this.hotel = new Hotel()
          this.carts = []
          this.carts = value
          if (this.carts.length !== 0)
            this.hotelService.getHotelById(this.cryptoService.set('06052000', this.carts[0]?.hotelId)).subscribe(
              rs => {
                this.hotel = rs['data']
              }
            )
          this.roomDetails = []
          this.carts.forEach(cart => {
            this.roomTypeService.getRoomDetailByRoomTypeId(this.cryptoService.set('06052000', cart.roomTypeId)).subscribe(
              rs => {
                this.roomDetails.push(rs['data'])
              }
            )
          })
        },
        error: err => {
          console.error(err)
        }
      }
    )

  }

  ngOnInit(): void {
  }


  clearCart() {
    if (this.carts.length === 0) {
      alert('Your cart is empty!')
    } else {
      this.cartService.clearCart().subscribe(rs => {
        alert('Your booking cart has been cleared!')
        this.cartService.updateCarts()
        this.roomDetails = []
        this.hotel = new Hotel()

      })
    }
  }

  checkOut() {
    this.router.navigateByUrl('/book/booking-info')
  }
}