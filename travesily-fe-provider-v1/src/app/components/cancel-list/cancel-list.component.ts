import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Booking } from 'src/app/_models/booking';
import { BookingsService } from 'src/app/_services/bookings.service';
import { CryptoService } from 'src/app/_services/crypto.service';

@Component({
  selector: 'app-cancel-list',
  templateUrl: './cancel-list.component.html',
  styleUrls: ['./cancel-list.component.scss']
})
export class CancelListComponent{

  @Input() bookings: Booking[]
  dataSource
  constructor(private bookingsService: BookingsService, private cryptoService: CryptoService, private router: Router) {
    this.dataSource = new MatTableDataSource<Booking>(this.bookings);
  }

  displayedColumns: string[] = ['id', 'bookingDate', 'bookedQuantity'];
  openBookingDetail(id) {
    this.router.navigate(['/booking-detail'], { queryParams: { bookingId: this.cryptoService.set('06052000', id) } })
  }
}
