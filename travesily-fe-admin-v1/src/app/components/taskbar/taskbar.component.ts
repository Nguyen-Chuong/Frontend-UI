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
      console.log(this.account.type)
      localStorage.setItem('type', String(this.account.type))
      localStorage.setItem('admin-id', String(this.account.id))
    })
  }

  ngOnInit(): void {
    this.authService.getToken()
    this.negativeBar = [
      {
        name: "Approve", url: "/hotel-approve", icon: "fa fa-arrow-up-from-bracket"
      },
      {
        name: "Hotels", url: "/hotel-list", icon: "fa fa-hotel"
      },
      {
        name: "Bookings", url: "/booking"
      },
      {
        name: "Providers", url: "/provider"
      },
      {
        name: "Users", url: "/user"
      },
      {
        name: "Feedback", url: "/feedback"
      },
      {
        name: "Managers", url: "/manager-list"
      },
      {
        name: "Benefit", url: "/benefit"
      },
      {
        name: "Facility", url: "/facility"
      },
      {
        name: "District", url: "/add-district"
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
