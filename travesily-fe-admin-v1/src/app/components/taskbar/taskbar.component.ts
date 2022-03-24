import { Account } from 'src/app/_models/account';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/_services/auth-service.service';
import { first } from 'rxjs';


@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss']
})
export class TaskbarComponent implements OnInit {
  opened = true;
  account: Account
  constructor(private router: Router,
    private route: ActivatedRoute,
    public authService: AuthServiceService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    authService.getProfile().pipe(first()).subscribe(account => {
      this.account = account['data']
      localStorage.setItem('type', String(this.account.type))
      localStorage.setItem('admin-id', String(this.account.id))
    })
   }

  ngOnInit(): void {
    this.authService.getToken()

  }

  openApprovingHotels(): void{
    this.router.navigate(['hotel-approve'], {
      queryParams: { page: JSON.stringify(0), size: JSON.stringify(5) }
    });
  }

  openListHotels(): void{
    this.router.navigate(['hotel-list'], {
      queryParams: { page: JSON.stringify(0), size: JSON.stringify(5) }
    });
  }

  openListManager(): void{
    this.router.navigateByUrl('/manager-list');
  }

  openHistory(): void{
    this.router.navigate(['/history']);
  }

  openFeedbackList(): void{
    this.router.navigate(['feedback'], {
      queryParams: { page: JSON.stringify(0), size: JSON.stringify(5) }
    });
  }

  openBookingList(): void{
    this.router.navigate(['booking'], {
      queryParams: { page: JSON.stringify(0), size: JSON.stringify(5) }
    });
  }

  openUserList(): void{
    this.router.navigate(['user'], {
      queryParams: { page: JSON.stringify(0), size: JSON.stringify(5) }
    });
  }

  openProviderList(){
    this.router.navigate(['provider'], {
      queryParams: { page: JSON.stringify(0), size: JSON.stringify(5) }
    });
  }
  openBenefit(){
    this.router.navigate(['/benefit']);
  }

  openFacility(){
    this.router.navigate(['/facility']);
  }

  toggleSidebar(){
    this.opened = !this.opened
  }
}
