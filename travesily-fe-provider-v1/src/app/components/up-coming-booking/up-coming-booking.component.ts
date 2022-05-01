import { NotificationService } from 'src/app/_services/notification.service';
import { BookingsService } from 'src/app/_services/bookings.service';
import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from 'src/app/_models/booking';
import { first } from 'rxjs';
import { CryptoService } from 'src/app/_services/crypto.service';

@Component({
  selector: 'app-up-coming-booking',
  templateUrl: './up-coming-booking.component.html',
  styleUrls: ['./up-coming-booking.component.scss']
})
export class UpComingBookingComponent{

  @Input() bookings: Booking[] = []
  dataSource
  constructor(private bookingService: BookingsService,
    private notificationService: NotificationService,
    private cryptoService: CryptoService) {
    this.dataSource = new MatTableDataSource<Booking>(this.bookings);
  }

  displayedColumns: string[] = ['id', 'bookingDate', 'checkIn', 'checkOut', 'bookedQuantity', 'confirm'];

  confirmBooking(id){
    const encryptedId = this.cryptoService.set('06052000', id)
    this.bookingService.completeBooking(encryptedId).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Confirm booking successfully');
        window.location.reload()
      },
      error: () => {
        this.notificationService.onError('Confirm booking fail')
      }
    })
  }

}
