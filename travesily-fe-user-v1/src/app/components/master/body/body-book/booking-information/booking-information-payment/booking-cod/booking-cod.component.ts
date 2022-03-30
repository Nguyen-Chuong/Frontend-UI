import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookingService} from "../../../../../../../_services/booking.service";
import {Booking} from "../../../../../../../_models/booking";
import {CryptoService} from "../../../../../../../_services/crypto.service";
import {BookingRequest} from "../../../../../../../_models/booking-request";
import {AuthService} from "../../../../../../../_services/auth.service";
import {Hotel} from "../../../../../../../_models/hotel";
import {Account} from "../../../../../../../_models/account";
import {StorageService} from "../../../../../../../_services/storage.service";
import {HotelService} from "../../../../../../../_services/hotel.service";

@Component({
  selector: 'app-booking-cod',
  templateUrl: './booking-cod.component.html',
  styleUrls: ['./booking-cod.component.scss']
})
export class BookingCodComponent implements OnInit {
  booking: Booking = new Booking()
  bookingRequest: BookingRequest = new BookingRequest()
  hotel: Hotel = new Hotel()
  account: Account = new Account()
  totalPaid: number = 0

  constructor(private activatedRoute: ActivatedRoute, private bookingService: BookingService, private cryptoService: CryptoService, private router: Router, private authService: AuthService, private storageService: StorageService, private hotelService: HotelService) {
    this.bookingRequest = this.storageService.bookingRequest
    if (!this.bookingRequest) {
      this.router.navigateByUrl('/')
    }
    this.authService.getProfile().subscribe({
      next: account => {
        this.account = account['data']
        this.hotelService.getHotelById(this.cryptoService.set('06052000', this.bookingRequest.hotelId)).subscribe({
          next: hotel => {
            this.hotel = hotel['data']
            this.bookingRequest.bookingDetail.forEach(bookingDetail => {
              this.totalPaid += bookingDetail.paid * bookingDetail.quantity * (new Date(this.bookingRequest.checkOut).getTime()/ (1000 * 3600 * 24) - new Date(this.bookingRequest.checkIn).getTime()/ (1000 * 3600 * 24))
            })
            this.totalPaid *= ((100 - this.account.vip.discount) / 100 * (100 + this.hotel.taxPercentage) / 100)
          },
          error: err => console.error(err)
        })
      }
    })
  }


  ngOnInit(): void {
  }

  proceed() {
    this.bookingRequest.type = 1
    this.bookingService.addBooking(this.bookingRequest).subscribe({
      next: value => {
        this.router.navigate(['book/transaction-info'], {
          queryParams: {
            bookingId: this.cryptoService.set('06052000', value['data'])
          }
        })
      }
    })
  }
}
