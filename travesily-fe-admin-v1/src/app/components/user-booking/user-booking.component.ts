import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Booking } from 'src/app/_models/booking';
import { CryptoService } from 'src/app/_services/crypto.service';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.scss']
})
export class UserBookingComponent {
  @Input() bookings: Booking[]
  dataSource
  constructor(private router: Router,
    private cryptoService: CryptoService) {
    this.dataSource = new MatTableDataSource<Booking>(this.bookings);
  }

  displayedColumns: string[] = ['id', 'hotel', 'totalPaid', 'checkIn', 'checkOut', 'status'];

  openBookingDetail(id) {
    this.router.navigate(['/booking-detail'], { queryParams: { bookingId: this.cryptoService.set('06052000', id) } })
  }
}
