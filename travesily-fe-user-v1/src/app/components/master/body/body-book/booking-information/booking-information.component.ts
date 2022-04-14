import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Cart} from "../../../../../_models/cart";
import {CartService} from "../../../../../_services/cart.service";
import {AuthService} from "../../../../../_services/auth.service";
import {Account} from "../../../../../_models/account";
import {Hotel} from "../../../../../_models/hotel";
import {HotelService} from "../../../../../_services/hotel.service";
import {CryptoService} from "../../../../../_services/crypto.service";
import {RoomDetail} from "../../../../../_models/room-detail";
import {RoomTypeService} from "../../../../../_services/room-type.service";
import {StorageService} from "../../../../../_services/storage.service";
import {SearchFilter} from "../../../../../_models/search-filter";
import {BookingInformationDetail} from "../../../../../_models/booking-information-detail";

@Component({
  selector: 'app-booking-information',
  templateUrl: './booking-information.component.html',
  styleUrls: ['./booking-information.component.scss']
})
export class BookingInformationComponent implements OnInit {
  carts: Cart[] = []
  account: Account = new Account()
  hotel: Hotel = new Hotel()
  roomDetails: RoomDetail[] = []
  searchFilter: SearchFilter = new SearchFilter()
  bookingInformationDetails: BookingInformationDetail[] = []
  hasCoupon: number = 0

  constructor(private cartService: CartService, private authService: AuthService, private hotelService: HotelService, private cryptoService: CryptoService, private roomTypeService: RoomTypeService,
              storageService: StorageService, private router: Router) {
    //Get user search filter
    this.searchFilter = storageService.searchFilter
    this.authService.getProfile().subscribe({
      next: value => this.account = value['data']
    })
    this.cartService.getCarts().subscribe({
      next: value => {
        if (value.length === 0 && this.router.url === '/book/booking-info')
          this.router.navigate(['/']).then(() => {
            window.location.reload()
          })
        if (value.length !== 0) {
          this.carts = value
          this.carts.forEach(cart => {
            cart.dateIn = new Date(cart.dateIn)
            cart.dateOut = new Date(cart.dateOut)
          })
          this.hotelService.getHotelById(this.cryptoService.set('06052000', this.carts[0]?.hotelId)).subscribe({
            next: value => {
              this.hotel = value['data']
            },
            error: err => console.error(err)
          })
          this.bookingInformationDetails = []
          const tempRoomDetails = []
          this.carts.forEach(cart => {
            this.roomTypeService.getRoomDetailByRoomTypeId(this.cryptoService.set('06052000', cart.roomTypeId)).subscribe({
              next: value => {
                tempRoomDetails.push(value['data'])
              },
              complete: () => {
                this.roomDetails = tempRoomDetails
              }
            })
            const bookingInformationDetail = new BookingInformationDetail()
            bookingInformationDetail.dateIn = new Date(cart.dateIn)
            bookingInformationDetail.dateOut = new Date(cart.dateOut)
            bookingInformationDetail.quantity = cart.quantity
            this.bookingInformationDetails.push(bookingInformationDetail)
          })
        }
      }
    })
  }

  ngOnInit(): void {
  }

  setHasCoupon($event: number) {
    this.hasCoupon = $event
  }
}
