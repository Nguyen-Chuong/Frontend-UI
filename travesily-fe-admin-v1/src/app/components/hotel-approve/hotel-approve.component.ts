import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Hotel } from 'src/app/_models/hotel';
import { CryptoService } from 'src/app/_services/crypto.service';
import { HotelService } from 'src/app/_services/hotel.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { RequestService } from 'src/app/_services/request.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-hotel-approve',
  templateUrl: './hotel-approve.component.html',
  styleUrls: ['./hotel-approve.component.scss']
})
export class HotelApproveComponent implements OnInit {
  message: string
  checked: boolean
  currentPage: number
  pageSize: number
  pages: any[]
  total: number
  maxpage: number
  requests: Request[]
  dataSource
  isAdmin = true

  constructor(private requestsService: RequestService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private cryptoService: CryptoService
  ) { }

  displayedColumns: string[] = ['hotelName', 'requestDate', 'providerName', 'request', ' '];
  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.currentPage = param['page']
      this.pageSize = param['size']
    })

    this.requestsService.getAllRequest(1).pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
        this.maxpage = this.total / this.pageSize
        if (this.total % this.pageSize !== 0) {
          this.maxpage++
        }
        this.pages = Array.from({ length: this.maxpage }, (_, i) => i + 1)
      }
    )

    this.requestsService.getPageRequest(1, this.currentPage, this.pageSize).pipe(first()).subscribe(
      rs => {
        this.requests = rs['data']['items']
      }
    )
    this.dataSource = new MatTableDataSource<Request>(this.requests);
  }


  openHotelDetail(id) {
    const encryptedId =this.cryptoService.set('06052000',id)
    this.router.navigate(['hotel-detail'], {
      queryParams: { id: JSON.stringify(encryptedId)}
    });
  }

  acceptHotel(id) {
    const encryptedId = this.cryptoService.set('06052000',id)
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        checked: this.checked, message: "Are you sure wanna to Accept this hotel",
        isAdmin: this.isAdmin
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.checked = result['checked']
      if (this.checked) {
        this.requestsService.acceptHotel(encryptedId).pipe(first()).subscribe({
          next: () => {
            this.notificationService.onSuccess('Accept successfully');
            window.location.reload()
          },
          error: err => {
            this.notificationService.onError('Accept false')
          }
        })
      }
    });
  }

  denyHotel(id) {
    const encryptedId = this.cryptoService.set('06052000',id)
    console.log(encryptedId)
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        checked: this.checked, message: "Are you sure wanna to Denied this hotel",
        isAdmin: this.isAdmin
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.checked = result['checked']
      if (this.checked) {
        this.requestsService.denyHotel(encryptedId).pipe(first()).subscribe({
          next: () => {
            this.notificationService.onSuccess('Denied successfully');
            window.location.reload()
          },
          error: err => {
            console.log(err)
            this.notificationService.onError('Deny false')
          }
        })
      }
    });
  }
}
