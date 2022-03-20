import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
import {first} from "rxjs";
import {BenefitType} from "../../../../../_models/benefit-type";
import {Benefit} from "../../../../../_models/benefit";
import {FormBuilder} from "@angular/forms";
import {Booking} from "../../../../../_models/booking";

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
  isShow: boolean = false
  bookingForm

  sampleOptions = [
    {value: "Room on high floor", display: "I'd like a room on high floor"},
    {value: "Quiet room", display: "I'd like a quiet room"},
    {value: "Taxi pick up", display: "I'd like taxi pick me up"},
    {value: "Child bed", display: "I'd like to have a small bed for my child"},

  ]

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private authService: AuthService,
              private hotelService: HotelService,
              private cryptoService: CryptoService,
              private roomTypeService: RoomTypeService,
              private storageService: StorageService,
              private router: Router) {
    //Get user search filter
    this.searchFilter = storageService.searchFilter
    this.authService.getProfile().subscribe({
      next: value => this.account = value['data']
    })
    this.cartService.getCarts().subscribe({
      next: value => {
        this.carts = value
        this.carts.forEach(cart => {
          cart.dateIn = new Date(cart.dateIn)
          cart.dateOut = new Date(cart.dateOut)
        })
        this.hotelService.getHotelById(this.cryptoService.set('06052000', this.carts[0].hotelId)).subscribe({
          next: value => {
            this.hotel = value['data']
          }
        })

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
        })
      }
    })
  }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      smoking: [''],
      bed: [''],
      additional: ['']
    })
  }

  toggleTextArea() {
    this.isShow = !this.isShow
  }

  checkOut() {
    const booking: Booking = new Booking()
    booking.hotel = this.hotel
    booking.bookingDate = new Date()
    booking.checkIn = this.carts[0].dateIn
    booking.checkOut = this.carts[0].dateOut
    booking.totalPaid = ((this.roomDetails[0]?.price - this.roomDetails[0]?.price * this.roomDetails[0]?.dealPercentage / 100)
        * this.carts[0]?.quantity + (this.roomDetails[1]?.price * this.carts[1]?.quantity - this.roomDetails[1]?.price * this.roomDetails[1]?.dealPercentage / 100))
      * (100 + this.hotel.taxPercentage) / 100
    this.router.navigateByUrl('/book/booking-payment-info')
  }
}
