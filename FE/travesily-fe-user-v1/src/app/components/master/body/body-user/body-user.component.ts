import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body-user',
  templateUrl: './body-user.component.html',
  styleUrls: ['./body-user.component.scss']
})
export class BodyUserComponent implements OnInit {

  navItems=[
    {id:'bookings', name:'My Bookings'},
    {id:'reviews', name:'My Reviews'},
    {id: 'profile', name:'Profile'},
    {id: 'vip', name: 'Vip Status'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
