import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Account } from '../../../../_models/account';
import { AuthService } from '../../../../_services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  account: Account = new Account();

  constructor(private authService: AuthService) {
    authService
      .getProfile()
      .pipe(first())
      .subscribe((account) => {
        this.account = account['data'];
      });
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
