import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Account } from 'src/app/_models/account';
import { UserService } from 'src/app/_services/user.service';
import { CryptoService } from 'src/app/_services/crypto.service';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  currentTask = "Users"
  users: Account[]
  dataSource
  pageSize: number = 0
  total: number
  username: string
  isNotFound = false
  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private cryptoService: CryptoService,
    private spinner: NgxSpinnerService) { }
  displayedColumns: string[] = ['username', 'email', 'phone', 'vip'];

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.username = param['searchText'].slice(1, -1);

    })
    /** spinner starts on init */
    this.spinner.show();
    console.log(this.username)
    if (this.username) {
      this.userService.searchUserByUsername(this.username).pipe(first()).subscribe(
        rs => {
          this.users = rs['data']
          if (rs) {
            this.spinner.hide();
          }
          if(this.users.length === 0)
            this.isNotFound = true
        }
      )
    } else {
      this.userService.getAllUser().pipe(first()).subscribe(
        rs => {
          this.total = rs['data']['total']
          // check if data is loaded, hide it
          if (rs) {
            this.spinner.hide();
          }
        }
      )
      this.userService.getAllUserPage(0, 10).pipe(first()).subscribe(
        rs => {
          this.users = rs['data']['items']
          this.pageSize = rs['data']['pageSize']
        }
      )
    }
    this.dataSource = new MatTableDataSource<Account>(this.users);
  }

  openUserDetail(username): void {
    const encryptedUsername = this.cryptoService.set('06052000', username)
    this.router.navigate(['user-detail'], {
      queryParams: { username: JSON.stringify(encryptedUsername) }
    });
  }

  getPaginatorData(event: PageEvent) {
    this.userService.getAllUserPage(event.pageIndex, event.pageSize).pipe(first()).subscribe(
      rs => {
        this.users = rs['data']['items']
      }
    )
  }
}
