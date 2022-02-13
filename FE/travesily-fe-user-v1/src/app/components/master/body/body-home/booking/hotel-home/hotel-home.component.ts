import { Component, OnInit } from '@angular/core';
import {IGuestNumber} from "../../../../../../interfaces/guest-number";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-hotel-home',
  templateUrl: './hotel-home.component.html',
  styleUrls: ['./hotel-home.component.scss']
})
export class HotelHomeComponent implements OnInit {
  guestNum: IGuestNumber[] = []

  hotelForm = new FormGroup({
    destination: new FormControl('',[Validators.required]),
    from: new FormControl(''),
    to: new FormControl(),
    guestNumber: new FormControl(this.guestNum)
  })
  constructor() {
  }

  ngOnInit(): void {
  }

}
