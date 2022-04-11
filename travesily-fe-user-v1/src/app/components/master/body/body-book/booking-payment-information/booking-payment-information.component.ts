import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Account} from "../../../../../_models/account";
import {Hotel} from "../../../../../_models/hotel";
import {RoomDetail} from "../../../../../_models/room-detail";
import {SearchFilter} from "../../../../../_models/search-filter";
import {AuthService} from "../../../../../_services/auth.service";
import {HotelService} from "../../../../../_services/hotel.service";
import {CryptoService} from "../../../../../_services/crypto.service";
import {RoomTypeService} from "../../../../../_services/room-type.service";
import {StorageService} from "../../../../../_services/storage.service";
import {BookingDetail} from "../../../../../_models/booking-detail";
import {BookingInformationDetail} from "../../../../../_models/booking-information-detail";
import {BookingRequest} from "../../../../../_models/booking-request";

@Component({
  selector: 'app-booking-payment-information',
  templateUrl: './booking-payment-information.component.html',
  styleUrls: ['./booking-payment-information.component.scss']
})
export class BookingPaymentInformationComponent implements OnInit {
  bookingRequest: BookingRequest = new BookingRequest()
  bookingDetails: BookingDetail[] = []
  account: Account = new Account()
  hotel: Hotel = new Hotel()
  roomDetails: RoomDetail[] = []
  searchFilter: SearchFilter = new SearchFilter()
  bookingInformationDetails: BookingInformationDetail[] = []

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private hotelService: HotelService, private cryptoService: CryptoService, private roomTypeService: RoomTypeService,
    storageService: StorageService) {
    this.activatedRoute.queryParams.subscribe({
      next: () => {
        this.bookingRequest = storageService.bookingRequest
        //CHECK IF USER TRY TO BACKWARD AFTER COMPLETED PAYMENT
        // if(this.bookingRequest.status !== 1)
        //   this.router.navigateByUrl('/home')
        this.hotelService.getHotelById(this.cryptoService.set('06052000', this.bookingRequest.hotelId)).subscribe({
          next: hotel => {
            this.hotel = hotel['data']
            this.authService.getProfile().subscribe({
              next: value => {
                this.account = value['data']
                this.bookingInformationDetails = []
                this.roomDetails = []
                this.bookingRequest.bookingDetail.forEach(bookingDetail => {
                  this.roomTypeService.getRoomDetailByRoomTypeId(this.cryptoService.set('06052000', bookingDetail.roomTypeId)).subscribe({
                    next: roomDetail => {
                      this.roomDetails.push(roomDetail['data'])
                      const bookingInformationDetail = new BookingInformationDetail()
                      bookingInformationDetail.dateIn = new Date(this.bookingRequest.checkIn)
                      bookingInformationDetail.dateOut = new Date(this.bookingRequest.checkOut)
                      bookingInformationDetail.quantity = bookingDetail.quantity
                      this.bookingInformationDetails.push(bookingInformationDetail)
                    }
                  })
                })
              }
            })
          },
          error: err =>console.error(err)
        })
      }
    })
  }

  ngOnInit(): void {
  }
}
