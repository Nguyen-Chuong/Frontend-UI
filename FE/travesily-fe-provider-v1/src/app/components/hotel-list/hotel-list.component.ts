import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Hotel } from 'src/app/_models/hotel';
import { HotelService } from 'src/app/_services/hotel.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[]
  dataSource

  constructor(private hotelService: HotelService, private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
    ) { }

  displayedColumns: string[] = ['hotelName', 'address', 'status', 'detail'];

  ngOnInit(): void {
    this.hotelService.getAllHotel().pipe(first()).subscribe(
      rs => {
        this.hotels = rs['data']

      }
    )
    this.dataSource = new MatTableDataSource<Hotel>(this.hotels);
  }

  openHotelDetail(id) {
    // const encryptedId = this.cryptoService.set('06052000',id)
    // this.router.navigate(['hotel-detail'], {
    //   queryParams: { id: JSON.stringify(encryptedId)}
    // });
  }

}
