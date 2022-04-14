import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-coupon-dialog',
  templateUrl: './coupon-dialog.component.html',
  styleUrls: ['./coupon-dialog.component.scss']
})
export class CouponDialogComponent implements OnInit {
  code : string
  discount : number
  dateExpired : Date

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.paymentService.getCouponInfo().subscribe(
      rs => {
        this.code = rs['data']['code']
        this.discount = rs['data']['discount']
        this.dateExpired = rs['data']['dateExpired']
      }
    )
  }

}
