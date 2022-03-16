import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Account } from 'src/app/_models/account';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-negative-bar',
  templateUrl: './negative-bar.component.html',
  styleUrls: ['./negative-bar.component.scss']
})
export class NegativeBarComponent implements OnInit {

  opened = true;
  account: Account
  constructor(private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }
  ngOnInit(): void {
  }

  openApprovingHotels(): void{
    this.router.navigate(['hotel-approve'], {
      queryParams: { page: JSON.stringify(0), size: JSON.stringify(5) }
    });
  }

  openListHotels(): void{
    this.router.navigateByUrl('/hotel-list');
  }

  openListRequest(): void{
    this.router.navigateByUrl('/request-list');
  }

  openNewHotel(): void{
    this.router.navigate(['/new-hotel']);
  }

  openUpdateRoom(): void{
    this.router.navigate(['/update-room']);
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

  toggleSidebar(){
    this.opened = !this.opened
  }

}
