import { Hotel } from 'src/app/_models/hotel';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-hotel',
  templateUrl: './about-hotel.component.html',
  styleUrls: ['./about-hotel.component.scss']
})
export class AboutHotelComponent implements OnInit {
  @Input() hotel: Hotel
  name: string
  address: string
  nameDistrict: string
  providerName: string
  description: string
  lowestPrice: number

  constructor() { }

  ngOnInit(): void {
    this.name = this.hotel.name
    this.address = this.hotel.address
    this.nameDistrict = this.hotel.district.nameDistrict
    this.providerName = this.hotel.provider.providerName
    this.description = this.hotel.description
    this.lowestPrice = this.hotel.lowestPrice
  }
}
