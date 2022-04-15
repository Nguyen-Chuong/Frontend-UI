import { AuthServiceService } from 'src/app/_services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { Account } from 'src/app/_models/account';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  account: Account = new Account;
  username: string
  ngOnInit(): void {

  }

  constructor(private authService: AuthServiceService,
    private router: Router,) {
    authService.getProfile().pipe(first()).subscribe(account => {
      this.account = account['data']
      this.username = this.account.username.slice(2)
    })
  }

  public openAddAdmin(){
    this.router.navigateByUrl('/new-admin');
  }

  public openProfile(){
    this.router.navigateByUrl('/admin-profile');
  }

  public openVip(){
    this.router.navigateByUrl('/vip-info');
  }

  public logout(){
    this.authService.logout()
    window.location.href = 'http://localhost:4200'
    //window.location.href ='https://travesily.software/authentication/login'
  }

  // To open the url in the blank page.
  public itemBeforeEvent(args: MenuEventArgs) {
    args.element.getElementsByTagName('a')[0].setAttribute('target', '_blank');
  }

  openCoupon() {
    this.router.navigateByUrl('/edit-coupon')
  }
}
