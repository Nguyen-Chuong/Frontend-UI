import { Provider } from './../../_models/provider';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { ProviderService } from 'src/app/_services/provider.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/_services/notification.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {
  message: string
  checked: boolean
  providers: Provider[]
  dataSource
  currentPage: number
  pageSize: number
  pages: any[]
  total: number
  maxpage: number
  isAdmin= false
  constructor(private providerService: ProviderService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    public dialog: MatDialog) { }
  displayedColumns: string[] = ['id', 'username','providerName', 'email', 'phone', 'address', ' '];

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.currentPage = param['page']
      this.pageSize = param['size']
    })

    this.providerService.getAllProvider().pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
        this.maxpage = this.total / this.pageSize
        if (this.total % this.pageSize != 0) {
          this.maxpage++
        }
        this.pages = Array.from({ length: this.maxpage }, (_, i) => i + 1)
      }
    )
    this.providerService.getAllProviderPage(this.currentPage, this.pageSize).pipe(first()).subscribe(
      rs => {
        this.providers = rs['data']['items']
      }
    )
    this.dataSource = new MatTableDataSource<Provider>(this.providers);
    this.message = 'Are you sure wanna ban this provider!'
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
          error: err => {
            this.notificationService.onError('Removed false')
          }
        })
      }
    });
  }

  openPage(page) {
    this.router.navigate(['provider'], {
      queryParams: { page: JSON.stringify(page - 1), size: JSON.stringify(Number(this.pageSize)) }
    });
  }

}
