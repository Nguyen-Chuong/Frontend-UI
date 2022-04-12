import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../../../../../_models/booking";
import {Router} from "@angular/router";
import {CryptoService} from "../../../../../../_services/crypto.service";

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss']
})
export class BookingCardComponent implements OnInit {
  @Input() booking: Booking = new Booking()
  todayDate = new Date()
  constructor(private router: Router, private cryptoService: CryptoService) {
  }

  ngOnInit(): void {
    this.booking.checkIn = new Date(this.booking.checkIn)
    this.booking.checkOut = new Date(this.booking.checkOut)
  }

  viewDetail() {
    this.router.navigate(['/user/booking-detail'],{queryParams:{bookingId: this.cryptoService.set('06052000',this.booking.id)}})
  }

  review() {
    this.router.navigate(['/review'], {
      queryParams: {
        bookingId: this.cryptoService.set('06052000', this.booking.id)
      }
    })
  }
}
