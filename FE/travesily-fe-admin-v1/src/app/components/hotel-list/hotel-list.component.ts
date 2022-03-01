import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { Hotel } from 'src/app/_models/hotel';
import { HotelService } from 'src/app/_services/hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent  {
  page: number = 0
  pageSize: number = 5
  pages: number[]
  hotels: Hotel[]
  dataSource
  constructor(private hotelsService: HotelService) {
    this.hotelsService.getHotelByStatus(1).pipe(first()).subscribe(
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
