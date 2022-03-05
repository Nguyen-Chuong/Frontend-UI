import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first, Observable, ReplaySubject } from 'rxjs';
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
    this.hotelsService.getAllHotelByStatus(3).pipe(first()).subscribe(
      rs => {
        this.hotels = rs['data']['items']
      }
    )
    this.dataSource = new MatTableDataSource<Hotel>(this.hotels);

  }
  displayedColumns: string[] = ['hotelName', 'lowestPrice', 'address', 'status', 'request'];

  openHotelDetail(id) {
  }

  acceptHotel(id){

  }

  denyHotel(id){
    this.hotels = this.hotels.slice(0, -1);
    this.dataSource.setData(this.hotels);
  }
}

class HotelDataSource extends DataSource<Hotel> {
  private _dataStream = new ReplaySubject<Hotel[]>();

  constructor(initialData: Hotel[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Hotel[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Hotel[]) {
    this._dataStream.next(data);
  }
}
