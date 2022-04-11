import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../../../../../../../_services/payment.service";
import {Router} from "@angular/router";
import {BookingService} from "../../../../../../../_services/booking.service";
import {Booking} from "../../../../../../../_models/booking";
import {PaymentDto} from "../../../../../../../_models/payment-dto";
import {CryptoService} from "../../../../../../../_services/crypto.service";
import {BookingRequest} from "../../../../../../../_models/booking-request";
import {StorageService} from "../../../../../../../_services/storage.service";
import {HotelService} from "../../../../../../../_services/hotel.service";
import {Hotel} from "../../../../../../../_models/hotel";
import {AuthService} from "../../../../../../../_services/auth.service";
import {Account} from "../../../../../../../_models/account";

@Component({
  selector: 'app-booking-vnpay',
  templateUrl: './booking-vnpay.component.html',
  styleUrls: ['./booking-vnpay.component.scss']
})
export class BookingVnpayComponent implements OnInit {
  booking: Booking = new Booking()
  bookingRequest: BookingRequest = new BookingRequest()
  hotel: Hotel = new Hotel()
  account: Account = new Account()
  totalPaid: number = 0

  constructor(private paymentService: PaymentService, private bookingService: BookingService, private router: Router, private cryptoService: CryptoService, private storageService: StorageService, private hotelService: HotelService, private authService: AuthService) {
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
    this.bookingRequest.type = 2
    this.bookingService.addBooking(this.bookingRequest).subscribe({
      next: value => {
        const paymentDto = new PaymentDto()
        paymentDto.amount = this.totalPaid * 100
        paymentDto.description = `${value['data']}-Travesily booking payment`
        this.paymentService.getIpaddress().subscribe({
          next: data => {
            paymentDto.ipAddress = data['ip']
            this.paymentService.createPayment(paymentDto).subscribe({
              next: value => {
                window.location.href = value['data']['url']
              }
            })
          }
        })
      }
    })
  }
}
