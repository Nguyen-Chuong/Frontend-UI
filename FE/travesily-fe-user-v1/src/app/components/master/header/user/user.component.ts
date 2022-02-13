import {Component, OnInit} from '@angular/core';
import {LoginInfo} from "../../../../_models/login-info";
import {AuthService} from "../../../../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  username
  avatar

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.username = this.authService?.username
    this.avatar = this.authService?.avatar
  }

  logout(){
    this.authService.logout()
    window.location.reload()
  }


}
