import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PaymentService} from "../../../../../../../_services/payment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BookingService} from "../../../../../../../_services/booking.service";
import {Booking} from "../../../../../../../_models/booking";
import {PaymentDto} from "../../../../../../../_models/payment-dto";

@Component({
  selector: 'app-booking-vnpay',
  templateUrl: './booking-vnpay.component.html',
  styleUrls: ['./booking-vnpay.component.scss']
})
export class BookingVnpayComponent implements OnInit {
  booking: Booking = new Booking()

  constructor(private fb: FormBuilder,
              private paymentService: PaymentService,
              private activatedRoute: ActivatedRoute,
              private bookingService: BookingService) {

    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.bookingService.getBookingById(value['bookingId']).subscribe({
          next: booking => {
            this.booking = booking['data']
          }
        })
      }
    })
  }

  ngOnInit(): void {
  }

  proceed() {
    const paymentDto = new PaymentDto()
    paymentDto.amount = this.booking.totalPaid*100
    paymentDto.description = `Travesily payment for booking id: ${this.booking.id}`
    this.paymentService.createPayment(paymentDto).subscribe({
      next: value => {
        window.location.href = value['data']['url']
      }
    })
  }
}
