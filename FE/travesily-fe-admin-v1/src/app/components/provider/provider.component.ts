import { Provider } from './../../_models/provider';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { ProviderService } from 'src/app/_services/provider.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {

  providers: Provider[]
  dataSource
  currentPage: number
  pageSize: number
  pages: any[]
  total: number
  maxpage: number
  constructor(private providerService: ProviderService,
    private router: Router,
    private route: ActivatedRoute) { }
  displayedColumns: string[] = ['id', 'username','providerName', 'email', 'phone', 'address'];

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      console.log(param)
      this.currentPage = param['page']
      this.pageSize = param['size']
    })

    this.providerService.getAllProvider().pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
        console.log('total: ' + this.total)
        this.maxpage = this.total / this.pageSize
        if (this.total % this.pageSize != 0) {
          this.maxpage++
        }
        console.log('maxpage: ' + this.maxpage)
        this.pages = Array.from({ length: this.maxpage }, (_, i) => i + 1)
        console.log('length: ' + this.pages.length)
      }
    )
    this.providerService.getAllProviderPage(this.currentPage, this.pageSize).pipe(first()).subscribe(
      rs => {
        this.providers = rs['data']['items']
      }
    )
    this.dataSource = new MatTableDataSource<Provider>(this.providers);
  }

  openUserDetail(id): void {
    this.router.navigate(['user-detail'], {
      queryParams: { id: JSON.stringify(id) }
    });
  }

  openPage(page) {
    this.router.navigate(['provider'], {
      queryParams: { page: JSON.stringify(page - 1), size: JSON.stringify(Number(this.pageSize)) }
    });
  }

}
