import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/_models/account';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-negative-bar',
  templateUrl: './negative-bar.component.html',
  styleUrls: ['./negative-bar.component.scss']
})
export class NegativeBarComponent implements OnInit {
  @Input() currentTask : string
  negativeBar = []
  opened = true;
  account: Account
  constructor(private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }
  ngOnInit(): void {
    this.negativeBar = [
      {
        name: "My Hotel", url: "/hotel-list", icon: "fa fa-hotel"
      },
      {
        name: "Requests", url: "/request-list", icon: "fa fa-list-check-f"
      },
      {
        name: "New Hotel", url: "/new-hotel", icon: "fa fa-album-circle-plus"
      },
      {
        name: "My Room", url: "/update-room", icon: "fa fa-wrench"
      },
      {
        name: "Benefits", url: "/update-benefit", icon: "fa fa-hands-holding-dollar"
      },
      {
        name: "Facilities", url: "/update-facility", icon: "fa fa-umbrella-beach"
      },
      {
        name: "Images", url: "/room-image", icon: "fa fa-images"
      }
    ]
  }

}
