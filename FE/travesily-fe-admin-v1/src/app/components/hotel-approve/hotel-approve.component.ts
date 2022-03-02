import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { Hotel } from 'src/app/_models/hotel';
import { HotelService } from 'src/app/_services/hotel.service';

@Component({
  selector: 'app-hotel-approve',
  templateUrl: './hotel-approve.component.html',
  styleUrls: ['./hotel-approve.component.scss']
})
export class HotelApproveComponent{

  hotels: Hotel[]
  dataSource
  constructor(private hotelsService: HotelService) {
    this.hotelsService.getHotelByStatus(0).pipe(first()).subscribe(
      rs => {
        this.hotels = rs['data']['items']
      }
    )
    this.dataSource = new MatTableDataSource<Hotel>(this.hotels);

  }
  displayedColumns: string[] = ['hotelName', 'lowestPrice', 'address', 'status'];

  openHotelDetail(id) {

  }
}
