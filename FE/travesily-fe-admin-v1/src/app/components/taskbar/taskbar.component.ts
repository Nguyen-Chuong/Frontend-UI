import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/_services/auth-service.service';


@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss']
})
export class TaskbarComponent implements OnInit {
  opened = true;
  constructor(private router: Router,
    private route: ActivatedRoute,
    public authService: AuthServiceService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
  }

  openApprovingHotels(): void{
    this.router.navigateByUrl('/hotel-approve');
  }

  openListHotels(): void{
    this.router.navigate(['hotel-list'], {
      queryParams: { page: JSON.stringify(0), size: JSON.stringify(5) }
    });
  }

  openHistory(): void{
    this.router.navigate(['/history']);
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

  toggleSidebar(){
    this.opened = !this.opened
  }
}
