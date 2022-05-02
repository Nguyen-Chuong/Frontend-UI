import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/_models/account';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-negative-bar',
  templateUrl: './negative-bar.component.html',
  styleUrls: ['./negative-bar.component.scss']
})
export class NegativeBarComponent implements OnInit {
  currentTask : string
  negativeBar = []
  account: Account
  isHidden = false
  isResize = false
  
  constructor(private router: Router,
    public authService: AuthService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  
  ngOnInit(): void {
    this.negativeBar = [
      {
        name: "Dashboard", url: "/dashboard", icon: "fa fa-dashboard"
      },
      {
        name: "My Hotel", url: "/hotel-list", icon: "fa fa-hotel"
      },
      {
        name: "Requests", url: "/request-list", icon: "fa fa-check"
      },
      {
        name: "New Hotel", url: "/new-hotel", icon: "fa fa-plus"
      },
      {
        name: "My Room", url: "/update-room", icon: "fa fa-wrench"
      },
      {
        name: "Benefits", url: "/update-benefit", icon: "fa fa-rebel"
      },
      {
        name: "Facilities", url: "/update-facility", icon: "fa fa-gift"
      },
      {
        name: "Images", url: "/room-image", icon: "fa fa-picture-o"
      },
      {
        name: "Contact", url: "/contact", icon: "fa fa-address-book-o"
      }
    ]
  }
  changeCurrentTask(name){
    this.currentTask = name
  }

  changeMenu() {
    this.isHidden = !this.isHidden
  }

  @HostListener('window:resize', ['$event'])

  onResize() {
    if (window.innerWidth <= 600) {
      this.isHidden = true
      this.isResize = true
    } else
      this.isResize = false
  }
}
