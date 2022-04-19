import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CouponDialogComponent} from 'src/app/shared/components/coupon-dialog/coupon-dialog.component';
import {StorageService} from "../../../../_services/storage.service";
import {AuthService} from "../../../../_services/auth.service";
import {PaymentService} from "../../../../_services/payment.service";

@Component({
  selector: 'app-body-home',
  templateUrl: './body-home.component.html',
  styleUrls: ['./body-home.component.scss']
})
export class BodyHomeComponent implements OnInit {
  constructor(private dialog: MatDialog,
              private storage: StorageService,
              private authService: AuthService,
              private paymentService: PaymentService) {
    if (this.storage.authToken)
      this.authService.getProfile().subscribe({
        next: value => {
          if (value['data'] !== null) {
            this.paymentService.getCouponInfo().subscribe(
              rs => {
                if (new Date(rs['data']['dateExpired']).getTime() > new Date().getTime())
                  this.dialog.open(CouponDialogComponent);
              }
            )
          }

        }
      })
  }

  ngOnInit(): void {

  }
}
