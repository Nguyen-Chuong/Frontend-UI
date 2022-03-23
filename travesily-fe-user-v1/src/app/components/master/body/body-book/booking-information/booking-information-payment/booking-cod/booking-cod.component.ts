import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookingService} from "../../../../../../../_services/booking.service";
import {Booking} from "../../../../../../../_models/booking";
import {CryptoService} from "../../../../../../../_services/crypto.service";

@Component({
  selector: 'app-booking-cod',
  templateUrl: './booking-cod.component.html',
  styleUrls: ['./booking-cod.component.scss']
})
export class BookingCodComponent implements OnInit {
  booking: Booking = new Booking()

  constructor(private activatedRoute: ActivatedRoute,
              private bookingService: BookingService,
              private cryptoService: CryptoService,
              private router: Router) {
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.bookingService.getBookingById(value['bookingId']).subscribe({
          next: booking => {
            this.booking = booking['data']
            if(this.booking.status!==0){
              this.router.navigateByUrl('/home')
            }
          }
        })
      }
    })
  }


  ngOnInit(): void {
  }

  proceed() {
    this.bookingService.updateBookingType(this.cryptoService.set('06052000', this.booking.id), 2).subscribe({
      next: value => {
        this.router.navigate(['book/transaction-info'],{queryParams:{
          bookingId: this.booking.id
          }})
      }
    })
  }
}
