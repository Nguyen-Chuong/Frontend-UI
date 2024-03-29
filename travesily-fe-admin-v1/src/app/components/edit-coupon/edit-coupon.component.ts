import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CouponService} from "../../_services/coupon.service";
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.scss']
})
export class EditCouponComponent implements OnInit {
  form: FormGroup
  todayDate = new Date().toISOString().slice(0, 16)
  couponExisted: boolean = false
  activeCode: string
  activeDiscount: number
  activeExpire: Date

  constructor(private fb: FormBuilder,
    private couponService: CouponService,
    private notificationService: NotificationService) {
    this.couponService.getCoupon().subscribe({
      next: coupon => {
        this.couponExisted = true
        this.activeCode = coupon['data']['code']
        this.activeDiscount = coupon['data']['discount']
        this.activeExpire = coupon['data']['dateExpired']
      },
      error: () => {
        this.couponExisted = false
      }
    })
  }

  ngOnInit(): void {
    document.getElementById('expire')
    this.form = this.fb.group({
      code: ['', Validators.required],
      discount: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0)]],
      expire: [null, [Validators.required]]
    })
  }

  getErrorMessage(field: string) {
    if (field === 'code' && this.form.controls['code'].hasError('required')) {
      return 'You must enter a coupon code!';
    } else if (field === 'discount' && this.form.controls['discount'].hasError('required')) {
      return 'You must enter a discount value!';
    } else if (field === 'discount' && this.form.controls['discount'].hasError('min')) {
      return 'Discount amount can not be less than 0!';
    } else if (field === 'discount' && this.form.controls['discount'].hasError('pattern')) {
      return 'Discount must be a number!';
    } else if (field === 'expire' && this.form.controls['expire'].hasError('required')) {
      return 'An expire date must be specified!';
    }
    return this.form.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  setCoupon() {
    const val = this.form?.value
    this.couponService.setCoupon(val.code, val.discount, val.expire).subscribe({
      next: () => {
        this.notificationService.onSuccess('Edit coupon successfully');
        this.couponService.getCoupon().subscribe({
          next: coupon => {
            this.couponExisted = true
            this.activeCode = coupon['data']['code']
            this.activeDiscount = coupon['data']['discount']
            this.activeExpire = coupon['data']['dateExpired']
          },
          error: () => {
            this.couponExisted = false
          }
        })
      },
      error: err => {
        this.notificationService.onError('Edit coupon fail');
        console.error(err)
      }
    })
  }
}
