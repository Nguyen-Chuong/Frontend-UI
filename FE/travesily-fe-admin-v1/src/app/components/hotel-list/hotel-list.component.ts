import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Hotel } from 'src/app/_models/hotel';
import { HotelService } from 'src/app/_services/hotel.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent {
  message: string
  checked: boolean
  currentPage: number
  pageSize: number
  pages: any[]
  total: number
  maxpage: number
  hotels: Hotel[]
  dataSource
  constructor(private hotelsService: HotelService, private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    public dialog: MatDialog) { }

  displayedColumns: string[] = ['hotelName', 'lowestPrice', 'address', ' ', 'detail'];

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
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
    this.message = 'Are you sure wanna ban this hotel!'
  }

  openHotelDetail(id) {
    this.router.navigate(['hotel-detail'], {
      queryParams: { id: JSON.stringify(id)}
    });
  }

  deleteHotel(id){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {checked: this.checked, message: this.message},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.checked = result['checked']
      if(this.checked){
        this.hotelsService.deleteHotel(id).pipe(first()).subscribe({
          next: () => {
            this.notificationService.onSuccess('Removed successfully');
            window.location.reload()
          },
          error: err => {
            this.notificationService.onError('Removed false')
          }
        })
      }
    });
  }

  openPage(page) {
    this.router.navigate(['hotel-list'], {
      queryParams: { page: JSON.stringify(page-1), size: JSON.stringify(Number(this.pageSize)) }
    });
  }

}
