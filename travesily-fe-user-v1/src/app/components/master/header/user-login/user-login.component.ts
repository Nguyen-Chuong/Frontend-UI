import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../_services/auth.service";
import {Account} from "../../../../_models/account";
import {StorageService} from "../../../../_services/storage.service";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  account: Account

  constructor(private authService: AuthService, private storage: StorageService) {
    if (this.storage.authToken)
      this.authService.getProfile()
        .subscribe(account => {
          this.account = account['data']
        })
  }

  ngOnInit(): void {
  }
}
