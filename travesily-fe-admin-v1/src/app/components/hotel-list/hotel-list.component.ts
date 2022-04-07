import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Hotel } from 'src/app/_models/hotel';
import { CryptoService } from 'src/app/_services/crypto.service';
import { HotelService } from 'src/app/_services/hotel.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent {
  currentTask = "Hotels"
  message: string
  checked: boolean
  pageSize: number
  total: number
  hotels: Hotel[]
  dataSource
  isAdmin = false
  constructor(private hotelsService: HotelService, private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private cryptoService: CryptoService) { }

  displayedColumns: string[] = ['hotelName', 'lowestPrice', 'address', ' ', 'detail'];

  ngOnInit(): void {
    if (localStorage.getItem('type') === '2') {
      this.isAdmin = true
    }
    this.hotelsService.getAllHotelByStatus(1).pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
      }
    )
    this.hotelsService.getHotelByStatus(1, 0, 5).pipe(first()).subscribe(
      rs => {
        this.hotels = rs['data']['items']
        this.pageSize = rs['data']['pageSize']
      }
    )
    this.dataSource = new MatTableDataSource<Hotel>(this.hotels);
    this.message = 'Are you sure wanna ban this hotel!'
  }

  openHotelDetail(id) {
    const encryptedId = this.cryptoService.set('06052000', id)
    this.router.navigate(['hotel-detail'], {
      queryParams: { id: JSON.stringify(encryptedId) }
    });
  }

  deleteHotel(id) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { checked: this.checked, message: this.message, isAdmin: this.isAdmin },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.checked = result['checked']
      if (this.checked) {
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

  getPaginatorData(event: PageEvent) {
    this.hotelsService.getHotelByStatus(1, event.pageIndex, event.pageSize).pipe(first()).subscribe(
      rs => {
        this.hotels = rs['data']['items']
      }
    )
  }

}
