import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-authorized',
  templateUrl: './header-authorized.component.html',
  styleUrls: ['./header-authorized.component.scss']
})
export class HeaderAuthorizedComponent implements OnInit {
  navItems = [
    {id: 'hotelAndHome', name: 'Hotel & Home'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
