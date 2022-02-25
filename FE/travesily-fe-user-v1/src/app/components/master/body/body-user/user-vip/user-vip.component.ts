import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../../_services/auth.service";
import {Vip} from "../../../../../_models/vip";
import {first} from "rxjs";
import {AlertService} from "../../../../../_services/alert.service";
import {Account} from "../../../../../_models/account";
import {BookingService} from "../../../../../_services/booking.service";

@Component({
  selector: 'app-user-vip',
  templateUrl: './user-vip.component.html',
  styleUrls: ['./user-vip.component.scss']
})
export class UserVipComponent implements OnInit {
  account: Account
  bookingCount: number

  constructor(private authService: AuthService, private alertService: AlertService, private bookingService: BookingService) {
    authService.getProfile().pipe(first()).subscribe(rs => {
        this.account = rs['data']
        bookingService.getCompletedBooking(this.account.id).pipe(first()).subscribe(rs => {
            this.bookingCount = rs['data']
          document.getElementById('progress-bar').style.width=`${this.bookingCount*5}%`
          },
          error => {
            console.log(error)
          })
      },
      error => {
        this.alertService.error(error)
      })
  }

  ngOnInit(): void {
  }

}
