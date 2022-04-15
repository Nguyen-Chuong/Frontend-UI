import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CouponService} from "../../_services/coupon.service";

@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.scss']
})
export class EditCouponComponent implements OnInit {
  form: FormGroup
  couponExisted: boolean = false
  code: string
  discount: number
  expire: Date

  constructor(private fb: FormBuilder,
              private couponService: CouponService) {
    this.couponService.getCoupon().subscribe({
      next: coupon => {
        this.couponExisted = true
        this.code = coupon['data']['code']
        this.discount = coupon['data']['discount']
        this.expire = coupon['data']['dateExpired']
      },
      error: err => {
        this.couponExisted = false
      }
    })
  }

  ngOnInit(): void {
    var today = new Date().toISOString().slice(0, 16);
    document.getElementsByName("expire")[0]['min'] = today;
    this.form = this.fb.group({
      code: ['', Validators.required],
      discount: ['', [Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(0)]],
      expire: [null, [Validators.required]]
    })
  }

  getErrorMessage(field: string) {
    if (field === 'code' && this.form.controls['code'].hasError('required')) {
      return 'You must enter a coupon code!';
    } else if (field === 'discount' &&this.form.controls['discount'].hasError('required')) {
      return 'You must enter a discount value!';
    } else if (field === 'discount' &&this.form.controls['discount'].hasError('min')) {
      return 'Discount amount can not be less than 0!';
    }else if (field === 'discount' &&this.form.controls['discount'].hasError('pattern')) {
      return 'Discount must be a number!';
    }else if (field === 'expire' &&this.form.controls['expire'].hasError('required')) {
      return 'An expire date must be specified!';
    }

    return this.form.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  setCoupon() {
    const val = this.form?.value
    this.couponService.setCoupon(val.code, val.discount, val.expire).subscribe({
      next: value => {
        alert('Set coupon successfully!')
      },
      error: err => {
        alert('Set coupon failed!')
        console.error(err)
      }
    })
  }
}
