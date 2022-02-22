import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-approve',
  templateUrl: './hotel-approve.component.html',
  styleUrls: ['./hotel-approve.component.scss']
})
export class HotelApproveComponent implements OnInit {

  hotels = [
    {
      background_image: "https://images.trvl-media.com/hotels/34000000/33520000/33519300/33519248/307de976.jpg?impolicy=fcrop&w=670&h=385&p=1&q=medium",
      name: "Hotel Name",
      lowest_price: 500000
    },
    {
      background_image: "https://images.trvl-media.com/hotels/34000000/33520000/33519300/33519248/307de976.jpg?impolicy=fcrop&w=670&h=385&p=1&q=medium",
      name: "Hotel Name",
      lowest_price: 500000
    },
    {
      background_image: "https://images.trvl-media.com/hotels/34000000/33520000/33519300/33519248/307de976.jpg?impolicy=fcrop&w=670&h=385&p=1&q=medium",
      name: "Hotel Name",
      lowest_price: 500000
    },
    {
      background_image: "https://images.trvl-media.com/hotels/34000000/33520000/33519300/33519248/307de976.jpg?impolicy=fcrop&w=670&h=385&p=1&q=medium",
      name: "Hotel Name",
      lowest_price: 500000
    }
  ]
  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
  }

  openHotelDetail(): void{
    this.router.navigate(['/hotel-detail']);
  }
}
