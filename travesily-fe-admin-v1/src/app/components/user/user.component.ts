import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Account } from 'src/app/_models/account';
import { UserService } from 'src/app/_services/user.service';
import { CryptoService } from 'src/app/_services/crypto.service';

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
    private route: ActivatedRoute,
    private cryptoService: CryptoService) { }
  displayedColumns: string[] = ['username', 'email', 'phone', 'vip'];

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.currentPage = param['page']
      this.pageSize = param['size']
    })

    this.userService.getAllUser().pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
        this.maxpage = this.total / this.pageSize
        if (this.total % this.pageSize != 0) {
          this.maxpage++
        }
        this.pages = Array.from({ length: this.maxpage }, (_, i) => i + 1)
      }
    )
    this.userService.getAllUserPage(this.currentPage, this.pageSize).pipe(first()).subscribe(
      rs => {
        this.users = rs['data']['items']
      }
    )
    this.dataSource = new MatTableDataSource<Account>(this.users);
  }

  openUserDetail(username): void {
    const encryptedUsername = this.cryptoService.set('06052000',username)
    this.router.navigate(['user-detail'], {
      queryParams: { username: JSON.stringify(encryptedUsername) }
    });
  }

  openPage(page) {
    this.router.navigate(['user'], {
      queryParams: { page: JSON.stringify(page - 1), size: JSON.stringify(Number(this.pageSize)) }
    });
  }
}
