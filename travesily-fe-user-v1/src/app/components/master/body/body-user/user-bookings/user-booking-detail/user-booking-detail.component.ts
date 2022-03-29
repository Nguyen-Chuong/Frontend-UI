import {Component, OnInit} from '@angular/core';
import {BookingService} from "../../../../../../_services/booking.service";
import {BookingDetail} from "../../../../../../_models/booking-detail";
import {first} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Booking} from "../../../../../../_models/booking";
import {Account} from "../../../../../../_models/account";
import {AuthService} from "../../../../../../_services/auth.service";
import {CryptoService} from "../../../../../../_services/crypto.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-booking-detail',
  templateUrl: './user-booking-detail.component.html',
  styleUrls: ['./user-booking-detail.component.scss']
})
export class UserBookingDetailComponent implements OnInit {
  account: Account = new Account()
  booking: Booking = new Booking()
  bookingDetails: BookingDetail[] = []

  constructor(authService: AuthService,
              private bookingService: BookingService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private cryptoService: CryptoService
  ) {
    authService.getProfile().pipe(first()).subscribe(rs => {
      this.account = rs['data']
    })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const encryptedId = params['bookingId']
      this.bookingService.getBookingDetail(encryptedId).subscribe(
        rs => {
          this.bookingDetails = rs['data']
        }
      )
      this.bookingService.getBookingById(encryptedId).subscribe(
        rs => {
          this.booking = rs['data']
          this.booking.checkIn = new Date(this.booking.checkIn)
          this.booking.checkOut = new Date(this.booking.checkOut)
          this.booking.totalDays = new Date(this.booking.checkOut).getTime() / (1000 * 3600 * 24) - new Date(this.booking.checkIn).getTime() / (1000 * 3600 * 24)
        }
      )
    })
  }

  review() {
    this.router.navigate(['/review'], {
      queryParams: {
        bookingId: this.cryptoService.set('06052000', this.booking.id)
      }
    })
  }

  bookAgain() {

  }

  cancel() {
    this.bookingService.cancelBooking(this.cryptoService.set('06052000', this.booking.id)).subscribe({
      next: value => {
        document.getElementById("btnCloseModal").click();
        Swal.fire('Cancel booking completed!', '', 'success').then(() => {
          this.router.navigateByUrl('/user/bookings/cancelled')
        })
      }
    })
  }
}
