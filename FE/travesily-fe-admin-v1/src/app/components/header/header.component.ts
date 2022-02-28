import { Account } from './../../../../../travesily-fe-user-v1/src/app/_models/account';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  account: Account = new Account;
  ngOnInit(): void {
  }

  constructor(private authService: AuthServiceService,
    private router: Router,) {
    authService.getProfile().pipe(first()).subscribe(account => {
      this.account = account['data']
    })
  }

  public openAddAdmin(){
    this.router.navigateByUrl('/new-admin');
  }

  public openProfile(){
    this.router.navigateByUrl('/admin-profile');
  }

  public logout(){
    this.authService.logout()
    window.location.href = 'http://localhost:4200'
  }

  // To open the url in the blank page.
  public itemBeforeEvent(args: MenuEventArgs) {
    args.element.getElementsByTagName('a')[0].setAttribute('target', '_blank');
  }
}
