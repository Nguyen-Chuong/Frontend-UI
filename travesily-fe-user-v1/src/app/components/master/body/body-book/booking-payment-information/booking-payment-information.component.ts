import {Component, OnInit} from '@angular/core';
import {BookingService} from "../../../../../_services/booking.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Booking} from "../../../../../_models/booking";
import {Cart} from "../../../../../_models/cart";
import {Account} from "../../../../../_models/account";
import {Hotel} from "../../../../../_models/hotel";
import {RoomDetail} from "../../../../../_models/room-detail";
import {SearchFilter} from "../../../../../_models/search-filter";
import {FormBuilder} from "@angular/forms";
import {CartService} from "../../../../../_services/cart.service";
import {AuthService} from "../../../../../_services/auth.service";
import {HotelService} from "../../../../../_services/hotel.service";
import {CryptoService} from "../../../../../_services/crypto.service";
import {RoomTypeService} from "../../../../../_services/room-type.service";
import {StorageService} from "../../../../../_services/storage.service";
import {BookingDetail} from "../../../../../_models/booking-detail";
import {BookingInformationDetail} from "../../../../../_models/booking-information-detail";

@Component({
  selector: 'app-booking-payment-information',
  templateUrl: './booking-payment-information.component.html',
  styleUrls: ['./booking-payment-information.component.scss']
})
export class BookingPaymentInformationComponent implements OnInit {
  booking: Booking = new Booking()
  bookingDetails: BookingDetail[] = []
  account: Account = new Account()
  hotel: Hotel = new Hotel()
  roomDetails: RoomDetail[] = []
  searchFilter: SearchFilter = new SearchFilter()
  bookingInformationDetails : BookingInformationDetail[] = []

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private authService: AuthService,
              private hotelService: HotelService,
              private cryptoService: CryptoService,
              private roomTypeService: RoomTypeService,
              private storageService: StorageService,
              private bookingService: BookingService,
              private router: Router) {
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.bookingService.getBookingById(value['bookingId']).subscribe({
          next: booking => {
            this.booking = booking['data']
            this.hotel = this.booking.hotel
            this.authService.getProfile().subscribe({
              next: value => this.account = value['data']
            })
            this.bookingService.getBookingDetail(value['bookingId']).subscribe({
              next: bookingDetail => {
                this.bookingDetails = bookingDetail['data']
                this.bookingInformationDetails = []
                const tempRoomDetails = []
                this.bookingDetails.forEach(item => {
                  this.roomTypeService.getRoomDetailByRoomTypeId(this.cryptoService.set('06052000', item.roomTypeId)).subscribe({
                    next: value => {
                      tempRoomDetails.push(value['data'])
                    },
                    complete: () => {
                      this.roomDetails = tempRoomDetails
                    }
                  })
                  const bookingInformationDetail = new BookingInformationDetail()
                  bookingInformationDetail.dateIn = new Date(this.booking.checkIn)
                  bookingInformationDetail.dateOut = new Date(this.booking.checkOut)
                  bookingInformationDetail.quantity = item.quantity
                  this.bookingInformationDetails.push(bookingInformationDetail)
                })
              }
            })
          }
        })
      }
    })
  }

  ngOnInit(): void {
  }

}
