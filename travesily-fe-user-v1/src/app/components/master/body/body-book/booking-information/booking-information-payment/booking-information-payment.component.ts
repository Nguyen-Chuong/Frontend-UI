import { Component, OnInit } from '@angular/core';
import {PaymentService} from "../../../../../../_services/payment.service";

@Component({
  selector: 'app-booking-information-payment',
  templateUrl: './booking-information-payment.component.html',
  styleUrls: ['./booking-information-payment.component.scss']
})
export class BookingInformationPaymentComponent implements OnInit {

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
  }

}
