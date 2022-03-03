import { UserService } from './../../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Booking } from 'src/app/_models/booking';
import { Account } from 'src/app/_models/account';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  users: Account[]
  dataSource
  currentPage: number
  pageSize: number
  pages: any[]
  total: number
  maxpage: number
  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }
  displayedColumns: string[] = ['username', 'email', 'phone', 'vip'];

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      console.log(param)
      this.currentPage = param['page']
      this.pageSize = param['size']
    })

    this.userService.getAllUser().pipe(first()).subscribe(
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
    this.userService.getAllUserPage(this.currentPage, this.pageSize).pipe(first()).subscribe(
      rs => {
        this.users = rs['data']['items']
      }
    )
    this.dataSource = new MatTableDataSource<Account>(this.users);
  }

  openUserDetail(id): void {
    this.router.navigate(['user-detail'], {
      queryParams: { id: JSON.stringify(id) }
    });
  }

  openPage(page) {
    this.router.navigate(['user'], {
      queryParams: { page: JSON.stringify(page - 1), size: JSON.stringify(Number(this.pageSize)) }
    });
  }
}
