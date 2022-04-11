import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Account } from 'src/app/_models/account';
import { AuthServiceService } from 'src/app/_services/auth-service.service';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss']
})
export class TaskbarComponent implements OnInit {
  @Input() currentTask: string
  opened = true;
  account: Account
  negativeBar = []
  constructor(private router: Router,
    public authService: AuthServiceService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.authService.getProfile().pipe(first()).subscribe(account => {
      this.account = account['data']
      localStorage.setItem('type', String(this.account.type))
      localStorage.setItem('admin-id', String(this.account.id))
    })
  }

  ngOnInit(): void {
    this.authService.getToken()
    this.negativeBar = [
      {
        name: "Approve", url: "/hotel-approve", icon: "fa fa-check"
      },
      {
        name: "Hotels", url: "/hotel-list", icon: "fa fa-hotel"
      },
      {
        name: "Bookings", url: "/booking", icon: "fa fa-clock-o"
      },
      {
        name: "Providers", url: "/provider", icon: "fa fa-product-hunt"
      },
      {
        name: "Users", url: "/user", icon: "fa fa-user-circle"
      },
      {
        name: "Feedback", url: "/feedback", icon: "fa fa-comments"
      },
      {
        name: "Managers", url: "/manager-list", icon: "fa fa-address-book"
      },
      {
        name: "Benefit", url: "/benefit", icon: "fa fa-rebel"
      },
      {
        name: "Facility", url: "/facility", icon: "fa fa-gift"
      },
      {
        name: "District", url: "/add-district", icon: "fa fa-plus"
      }
    ]
  }
}
