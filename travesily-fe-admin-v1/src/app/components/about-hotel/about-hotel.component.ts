import { Hotel } from 'src/app/_models/hotel';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-hotel',
  templateUrl: './about-hotel.component.html',
  styleUrls: ['./about-hotel.component.scss']
})
export class AboutHotelComponent implements OnInit {
  @Input() hotel: Hotel
  constructor() { }

  ngOnInit(): void {
  }
}
