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

  // openApprovingHotels(): void {
  //   this.router.navigate(['hotel-approve'])
  // }

  // openListHotels(): void {
  //   this.router.navigate(['hotel-list'])
  // }

  // openListManager(): void {
  //   this.router.navigateByUrl('/manager-list');
  // }

  // openHistory(): void {
  //   this.router.navigate(['/history']);
  // }

  // openFeedbackList(): void {
  //   this.router.navigate(['feedback'])
  // }

  // openBookingList(): void {
  //   this.router.navigate(['booking'])
  // }

  // openUserList(): void {
  //   this.router.navigate(['user'])
  // }

  // openProviderList() {
  //   this.router.navigate(['provider'])
  // }
  // openBenefit() {
  //   this.router.navigate(['/benefit']);
  // }

  // openFacility() {
  //   this.router.navigate(['/facility']);
  // }

  // openAddDistrict() {
  //   this.router.navigate(['/add-district']);
  // }
}
