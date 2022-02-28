import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from 'src/app/_models/booking';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.scss']
})
export class UserBookingComponent implements AfterViewInit {
  @Input() bookings: Booking[]
  dataSource
  constructor() {
    this.dataSource = new MatTableDataSource<Booking>(this.bookings);

  }

  displayedColumns: string[] = ['id', 'hotel', 'totalPaid','checkIn', 'checkOut', 'status'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

openBookingDetail(id){

}
}
