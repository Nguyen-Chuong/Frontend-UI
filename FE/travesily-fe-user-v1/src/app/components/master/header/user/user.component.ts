import {Component, OnInit} from '@angular/core';
import {LoginInfo} from "../../../../_models/login-info";
import {AuthService} from "../../../../_services/auth.service";
import {Router} from "@angular/router";
import {Account} from "../../../../_models/account";
import {first} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  account: Account = new Account()

  constructor(private authService: AuthService) {
    authService.getProfile().pipe(first()).subscribe(account => {
      this.account = account['data']
    })
    window.onclick = function(event) {
      if (!event.target.matches('.btn-dropdown *')&&!event.target.matches('.btn-dropdown')) {
        document.getElementById("user-dropdown").classList.remove('show')
      }
    }
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
    window.location.reload()
  }


  dropdown() {
    document.getElementById("user-dropdown").classList.toggle("show");
  }
// Close the dropdown menu if the user clicks outside of it

}
