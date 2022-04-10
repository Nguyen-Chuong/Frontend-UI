import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Account } from 'src/app/_models/account';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  account: Account = new Account;
  isLogin = false
  ngOnInit(): void {
  }

  constructor(private authService: AuthService,
    private router: Router,) {
    authService.getProfile().pipe(first()).subscribe(account => {
      this.account = account['data']
      this.isLogin = true
    })
  }

  public openSignIn(){
    this.router.navigateByUrl('/login');
  }

  public openSignUp(){
    this.router.navigateByUrl('/register');
  }

  public openProfile(){
    this.router.navigateByUrl('/profile');
  }

  public logout(){
    this.authService.logout()
    this.router.navigateByUrl('/login');
    this.isLogin = !this.isLogin
  }

  // To open the url in the blank page.
  // public itemBeforeEvent(args: MenuEventArgs) {
  //   args.element.getElementsByTagName('a')[0].setAttribute('target', '_blank');
  // }

}
