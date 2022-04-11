import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { CryptoService } from 'src/app/_services/crypto.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { RequestService } from 'src/app/_services/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  currentTask= "Requests"
  requests: Request[]
  dataSource
  checked

  constructor(private requestService: RequestService, 
    private cryptoService: CryptoService,
    public dialog: MatDialog,
    private notificationService: NotificationService
    ) { }

  displayedColumns: string[] = ['hotelName', 'requestDate', 'status', 'detail'];

  ngOnInit(): void {
    this.requestService.getAllRequest().pipe(first()).subscribe(
      rs => {
        this.requests = rs['data']
      }
    )
    this.dataSource = new MatTableDataSource<Request>(this.requests);
  }

  cancelRequest(id){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {checked: this.checked, message: "Are you sure you want to Cancel this Request"},
    });
    const encryptedId = this.cryptoService.set('06052000', id)
    dialogRef.afterClosed().subscribe(result => {
      this.checked = result['checked']
      if(this.checked){
        this.requestService.cancelRequest(encryptedId).pipe(first()).subscribe({
          next: () => {
            this.notificationService.onSuccess('Cancel successfully');
            window.location.reload()
          },
          error: () => {
            this.notificationService.onError('Cancel fail')
          }
        })
      }
    });
  }
}
