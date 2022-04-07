import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Account } from 'src/app/_models/account';
import { UserService } from 'src/app/_services/user.service';
import { CryptoService } from 'src/app/_services/crypto.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  currentTask= "Users"
  users: Account[]
  dataSource
  pageSize: number = 0
  total: number
  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private cryptoService: CryptoService) { }
  displayedColumns: string[] = ['username', 'email', 'phone', 'vip'];

  ngOnInit(): void {

    this.userService.getAllUser().pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
      }
    )
    this.userService.getAllUserPage(0, 5).pipe(first()).subscribe(
      rs => {
        this.users = rs['data']['items']
        this.pageSize = rs['data']['pageSize']
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

  getPaginatorData(event: PageEvent) {
    this.userService.getAllUserPage(event.pageIndex, event.pageSize).pipe(first()).subscribe(
      rs => {
        this.users = rs['data']['items']
      }
    )
  }
}
