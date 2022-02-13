import {Component, OnInit} from '@angular/core';
import {LoginInfo} from "../../../../_models/login-info";
import {AuthService} from "../../../../_services/auth.service";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  username
  avatar

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.username = this.authService?.username
    this.avatar = this.authService?.avatar
  }
}
