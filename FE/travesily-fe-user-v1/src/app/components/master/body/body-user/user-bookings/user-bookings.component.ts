import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})
export class UserBookingsComponent implements OnInit {

  navItems = [
    {id: 'upcoming', name: 'Upcoming'},
    {id: 'completed', name: 'Completed'},
    {id: 'cancelled', name: 'Cancelled'},
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
