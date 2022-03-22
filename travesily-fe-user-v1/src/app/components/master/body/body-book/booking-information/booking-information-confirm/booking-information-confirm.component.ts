import {Component, Input, OnInit} from '@angular/core';
import {Account} from "../../../../../../_models/account";
import {FormBuilder} from "@angular/forms";
import {BookingRequest} from "../../../../../../_models/booking-request";
import {BookingDetail} from "../../../../../../_models/booking-detail";
import {CartService} from "../../../../../../_services/cart.service";
import {BookingService} from "../../../../../../_services/booking.service";
import {CryptoService} from "../../../../../../_services/crypto.service";
import {Router} from "@angular/router";
import {Cart} from "../../../../../../_models/cart";
import {RoomDetail} from "../../../../../../_models/room-detail";
import {Hotel} from "../../../../../../_models/hotel";

@Component({
  selector: 'app-booking-information-confirm',
  templateUrl: './booking-information-confirm.component.html',
  styleUrls: ['./booking-information-confirm.component.scss']
})
export class BookingInformationConfirmComponent implements OnInit {
  @Input() account: Account = new Account()
  @Input() carts: Cart[] = []
  @Input() roomDetails: RoomDetail[] = []
  @Input() hotel: Hotel = new Hotel()
  isShow: boolean = false
  bookingForm

  constructor(private fb: FormBuilder,
              private cartService: CartService,
              private bookingService: BookingService,
              private cryptoService: CryptoService,
              private router: Router) {
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
    const booking: BookingRequest = new BookingRequest()
    const bookingDetails: BookingDetail[] = []
    booking.hotelId = this.carts[0].hotelId
    booking.bookingDate = new Date()
    booking.checkIn = this.carts[0].dateIn
    booking.checkOut = this.carts[0].dateOut
    booking.bookedQuantity = this.carts[0]?.bookedQuantity + (this.carts[1]?.bookedQuantity || 0)
    const val = this.bookingForm.value
    booking.otherRequirement = `${val.bed ? (val.bed + ', ') : ''}${val.smoking ? (val.smoking + ', ') : ''}${val.additional}`
    booking.status = 0
    this.roomDetails.forEach((roomDetail, i) => {
      const bookingDetail = new BookingDetail()
      bookingDetail.roomTypeId = roomDetail.id
      bookingDetail.quantity = this.carts[i].quantity
      bookingDetail.paid = ((roomDetail.price - roomDetail.price * roomDetail.dealPercentage / 100))
      bookingDetails.push(bookingDetail)
    })
    booking.bookingDetail = bookingDetails
    booking.type = 0
    this.bookingService.addBooking(booking).subscribe({
      next: booking => {
        this.cartService.clearCart().subscribe({
          next: value => {
            this.router.navigate(['/book/booking-payment-info'], {
              queryParams: {
                bookingId: this.cryptoService.set('06052000', booking['data'])
              }
            })
          }
        })
      },
      error: err => {
        console.error(err)
      }
    })
  }
}
