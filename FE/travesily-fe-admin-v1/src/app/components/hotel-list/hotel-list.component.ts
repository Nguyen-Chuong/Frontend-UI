import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Booking } from 'src/app/_models/booking';
import { Hotel } from 'src/app/_models/hotel';
import { HotelService } from 'src/app/_services/hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent {
  currentPage: number
  pageSize: number
  pages: any[]
  total: number
  maxpage: number
  hotels: Hotel[]
  dataSource
  constructor(private hotelsService: HotelService, private router: Router,
    private route: ActivatedRoute) { }

  displayedColumns: string[] = ['hotelName', 'lowestPrice', 'address', 'status'];

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      console.log(param)
      this.currentPage = param['page']
      this.pageSize = param['size']
    })

    this.hotelsService.getAllHotelByStatus(1).pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
        this.maxpage = this.total / this.pageSize
        if (this.total % this.pageSize != 0) {
          this.maxpage++
        }
        this.pages = Array.from({ length: this.maxpage }, (_, i) => i + 1)
      }
    )
    this.hotelsService.getHotelByStatus(1, this.currentPage, this.pageSize).pipe(first()).subscribe(
      rs => {
        this.hotels = rs['data']['items']

      }
    )
    this.dataSource = new MatTableDataSource<Hotel>(this.hotels);
  }

  openHotelDetail(id) {
    this.router.navigate(['hotel-detail'], {
      queryParams: { id: JSON.stringify(id)}
    });
  }

  openPage(page) {
    this.router.navigate(['hotel-list'], {
      queryParams: { page: JSON.stringify(page-1), size: JSON.stringify(Number(this.pageSize)) }
    });
  }

}
