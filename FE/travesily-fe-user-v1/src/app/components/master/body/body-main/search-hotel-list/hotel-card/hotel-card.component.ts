import {Component, Input, OnInit} from '@angular/core';
import {Hotel} from "../../../../../../_models/hotel";
import {first} from "rxjs";

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit {

  @Input() hotel: Hotel
  constructor() { }

  ngOnInit(): void {
  }



}
