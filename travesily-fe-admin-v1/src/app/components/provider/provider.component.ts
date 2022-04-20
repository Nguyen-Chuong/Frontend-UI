import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { NotificationService } from 'src/app/_services/notification.service';
import { ProviderService } from 'src/app/_services/provider.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Provider } from './../../_models/provider';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {
  currentTask = "Providers"
  message: string
  checked: boolean
  providers: Provider[]
  dataSource
  pageSize: number = 0
  total: number
  isAdmin= false
  status: number = 1
  constructor(private providerService: ProviderService,
    private router: Router,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService) { }
  displayedColumns: string[] = ['id', 'username','providerName', 'email', 'phone', 'address', ' '];

  ngOnInit(): void {
    /** spinner starts on init */
    this.spinner.show();

    this.providerService.getAllProvider(this.status).pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
      }
    )
    this.providerService.getAllProviderPage(this.status, 0, 10).pipe(first()).subscribe(
      rs => {
        this.providers = rs['data']['items']
        this.pageSize = rs['data']['pageSize']
        // check if data is loaded, hide it
        if(rs){
          this.spinner.hide();
        }
      }
    )
    this.dataSource = new MatTableDataSource<Provider>(this.providers);
    this.message = 'Are you sure you want to ban this provider!'
  }

  openUserDetail(id): void {
    this.router.navigate(['user-detail'], {
      queryParams: { id: JSON.stringify(id) }
    });
  }

  banProvider(id){
    if(Number(localStorage.getItem('type')) === 2){
      this.isAdmin = true
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {checked: this.checked, message: this.message, isAdmin: this.isAdmin},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.checked = result['checked']
      if(this.checked){
        this.providerService.deleteProvider(id).pipe(first()).subscribe({
          next: () => {
            this.notificationService.onSuccess('Removed successfully');
            window.location.reload()
          },
          error: () => {
            this.notificationService.onError('Removed fail')
          }
        })
      }
    });
  }

  getPaginatorData(event: PageEvent) {
    this.providerService.getAllProviderPage(this.status, event.pageIndex, event.pageSize).pipe(first()).subscribe(
      rs => {
        this.providers = rs['data']['items']
      }
    )
  }

  filterProvider(status){
    this.status = status.target['value']
    this.providerService.getAllProvider(this.status).pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
      }
    )
    this.providerService.getAllProviderPage(this.status, 0, 10).pipe(first()).subscribe(
      rs => {
        this.providers = rs['data']['items']
        this.pageSize = rs['data']['pageSize']
      }
    )
  }
}
