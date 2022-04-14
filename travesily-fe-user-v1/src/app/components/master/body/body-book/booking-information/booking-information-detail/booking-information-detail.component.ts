import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Account} from "../../../../../../_models/account";
import {RoomDetail} from "../../../../../../_models/room-detail";
import {Hotel} from "../../../../../../_models/hotel";
import {BookingInformationDetail} from "../../../../../../_models/booking-information-detail";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PaymentService} from "../../../../../../_services/payment.service";
import Swal from "sweetalert2";
import {StorageService} from "../../../../../../_services/storage.service";

@Component({
  selector: 'app-booking-information-detail',
  templateUrl: './booking-information-detail.component.html',
  styleUrls: ['./booking-information-detail.component.scss']
})
export class BookingInformationDetailComponent implements OnInit {
  @Input() roomDetails: RoomDetail[] = []
  @Input() hotel: Hotel = new Hotel()
  @Input() bookingInformationDetails: BookingInformationDetail[] = []
  @Input() account: Account = new Account()
  @Input() hasCouponApply: boolean = false
  @Output() setHasCoupon: EventEmitter<number> = new EventEmitter<number>()
  @Input() code: string
  @Input() discount: number = 0
  dateExpired: Date
  form: FormGroup

  constructor(private fb: FormBuilder,
              private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      coupon: ['']
    })
  }

  applyCoupon() {
    this.paymentService.getCouponInfo().subscribe({
      next: coupon => {
        this.code = coupon['data']['code']
        this.discount = coupon['data']['discount']
        this.dateExpired = new Date(coupon['data']['dateExpired'])
        if (this.form.value.coupon == this.code) {
          if (this.dateExpired.getTime() < new Date().getTime()) {
            Swal.fire('Your coupon has expired!', '', 'error').then(() => {
              this.code = undefined
              this.discount = 0
              this.dateExpired = undefined
              this.form.reset()
              this.setHasCoupon.emit(0)
            })
          } else {
            this.setHasCoupon.emit(1)
            Swal.fire('Your coupon has been applied!', '', 'success')
          }
        } else {
          Swal.fire('Your coupon does not existed!', '', 'error').then(() => {
            this.code = undefined
            this.discount = 0
            this.dateExpired = undefined
            this.form.reset()
            this.setHasCoupon.emit(0)
          })
        }
      }
    })
  }
}
