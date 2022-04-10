import { Image } from './../../_models/image';
import { Component, Input, OnInit } from '@angular/core';
import { Room } from 'src/app/_models/room';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  @Input() room: Room

  images: Image[]
  imageSrc: string
  constructor() { }
  ngOnInit(): void {
    this.images = this.room.listImage
    if (this.images.length === 0) {
      this.imageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt1R-elWRjhm7X8oDey-GQJeZa9fiPCT_QkA&usqp=CAU'
    } else {
      this.imageSrc = this.images[0].src
    }
  }
}
