import {Component, OnInit} from '@angular/core';
import {LoginInfo} from "../../../_models/login-info";
import {AuthService} from "../../../_services/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  username = this.authService.username
  avatar = this.authService.avatar

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

}
