import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../../../_services/auth.service";
import {first} from "rxjs";
import {Account} from "../../../../../../_models/account";

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.scss']
})
export class UserProfileDetailsComponent implements OnInit {
  account : Account = new Account()
  constructor(private authService: AuthService) {
    authService.getProfile().pipe(first()).subscribe(account => {
      this.account = account['data']
    })
  }

  ngOnInit(): void {
  }


}
