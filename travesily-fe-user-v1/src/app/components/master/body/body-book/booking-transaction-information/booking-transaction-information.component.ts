import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../../../../../_services/payment.service";
import {ActivatedRoute} from "@angular/router";
import {TransactionDto} from "../../../../../_models/transaction-dto";
import {TransactionInfo} from "../../../../../_models/transaction-info";
import {BookingService} from "../../../../../_services/booking.service";
import {CryptoService} from "../../../../../_services/crypto.service";
import {Booking} from "../../../../../_models/booking";
import {BookingDetail} from "../../../../../_models/booking-detail";
import {Hotel} from "../../../../../_models/hotel";
import {AuthService} from "../../../../../_services/auth.service";
import {Account} from "../../../../../_models/account";
import {StorageService} from "../../../../../_services/storage.service";

@Component({
  selector: 'app-booking-transaction-information',
  templateUrl: './booking-transaction-information.component.html',
  styleUrls: ['./booking-transaction-information.component.scss']
})
export class BookingTransactionInformationComponent implements OnInit {
  transactionInfo: TransactionInfo = new TransactionInfo()
  payDate: Date
  booking: Booking = new Booking()
  bookingDetails: BookingDetail[] = []
  hotel: Hotel = new Hotel()
  account: Account
  isCod: boolean = true

  constructor(private paymentService: PaymentService, private activatedRoute: ActivatedRoute, private bookingService: BookingService, private cryptoService: CryptoService, private authService: AuthService, private storageService: StorageService) {
    this.storageService.clearBookingRequest()
    this.authService.getProfile().subscribe({
      next: account => {
        this.account = account['data']
      }
    })
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        if (value['bookingId'] !== undefined) {
          this.isCod = true
          const bookingId = value['bookingId']
          this.bookingService.getBookingDetail(bookingId).subscribe({
              next: bookingDetails => {
                this.bookingDetails = bookingDetails['data']
              }
            }
          )
          this.bookingService.getBookingById(bookingId).subscribe({
            next: booking => {
              this.booking = booking['data']
              this.booking.checkIn = new Date(this.booking.checkIn)
              this.booking.checkOut = new Date(this.booking.checkOut)
              this.booking.totalDays = new Date(this.booking.checkOut).getTime() / (1000 * 3600 * 24) - new Date(this.booking.checkIn).getTime() / (1000 * 3600 * 24)
              this.hotel = this.booking.hotel
            }
          })
        } else {
          this.isCod = false
          this.bookingService.updateVipStatus().subscribe()
          const transaction: TransactionInfo = new TransactionInfo()
          transaction.amount = value['vnp_Amount']
          transaction.bankCode = value['vnp_BankCode']
          transaction.bankTranNo = value['vnp_BankTranNo']
          transaction.cardType = value['vnp_CardType']
          transaction.orderInfo = value['vnp_OrderInfo']
          transaction.payDate = value['vnp_PayDate']
          transaction.responseCode = value['vnp_ResponseCode']
          transaction.transactionNo = value['vnp_TransactionNo']
          transaction.idService = value['vnp_TxnRef']
          this.transactionInfo = transaction
          // this.transactionInfo = tran['data']
          const bookingId = +this.transactionInfo.orderInfo.split('-')[0]
          this.bookingService.completeBooking(this.cryptoService.set('06052000', bookingId)).subscribe({
            next: value => {
              this.bookingService.getBookingDetail(this.cryptoService.set('06052000', bookingId)).subscribe({
                  next: bookingDetails => {
                    this.bookingDetails = bookingDetails['data']
                  }
                }
              )
              this.bookingService.getBookingById(this.cryptoService.set('06052000', bookingId)).subscribe({
                next: booking => {
                  this.booking = booking['data']
                  this.booking.checkIn = new Date(this.booking.checkIn)
                  this.booking.checkOut = new Date(this.booking.checkOut)
                  this.booking.totalDays = new Date(this.booking.checkOut).getTime() / (1000 * 3600 * 24) - new Date(this.booking.checkIn).getTime() / (1000 * 3600 * 24)
                  this.hotel = this.booking.hotel
                  if (this.booking.status === 1) {
                    this.paymentService.getTransactionInfo(transaction).subscribe()
                  }
                }
              })
            }
          })
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
