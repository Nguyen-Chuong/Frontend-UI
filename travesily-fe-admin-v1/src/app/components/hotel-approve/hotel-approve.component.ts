import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { CryptoService } from 'src/app/_services/crypto.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { RequestService } from 'src/app/_services/request.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-hotel-approve',
  templateUrl: './hotel-approve.component.html',
  styleUrls: ['./hotel-approve.component.scss']
})
export class HotelApproveComponent implements OnInit {
  currentTask= "Approve"
  message: string
  checked: boolean
  pageSize: number = 0
  total: number
  requests: Request[]
  dataSource
  isAdmin = true
  status: number = 1

  constructor(private requestsService: RequestService,
    private router: Router,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private cryptoService: CryptoService
  ) { }

  displayedColumns: string[] = ['hotelName', 'requestDate', 'providerName', 'request', ' '];
  ngOnInit(): void {
    this.requestsService.getAllRequest(this.status).pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
      }
    )
    this.requestsService.getPageRequest(this.status, 0, 10).pipe(first()).subscribe(
      rs => {
        this.requests = rs['data']['items']
        this.pageSize = rs['data']['pageSize']
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
        checked: this.checked, message: "Are you sure you want to Accept this hotel",
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
            console.log(err)
            this.notificationService.onError('Accept fail')
          }
        })
      }
    });
  }

  denyHotel(id) {
    const encryptedId = this.cryptoService.set('06052000',id)
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        checked: this.checked, message: "Are you sure you want to Denied this hotel",
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
            this.notificationService.onError('Denied fail')
          }
        })
      }
    });
  }

  getPaginatorData(event: PageEvent) {
    this.requestsService.getPageRequest(this.status, event.pageIndex, event.pageSize).pipe(first()).subscribe(
      rs => {
        this.requests = rs['data']['items']
      }
    )
  }

  filterHotel(status){
    this.status = status.target['value']
    this.requestsService.getAllRequest(this.status).pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
      }
    )
    this.requestsService.getPageRequest(this.status, 0, 10).pipe(first()).subscribe(
      rs => {
        this.requests = rs['data']['items']
        this.pageSize = rs['data']['pageSize']
      }
    )
  }
}
