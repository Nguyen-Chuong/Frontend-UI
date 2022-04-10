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
  image: Image
  constructor() { }
  ngOnInit(): void {
    this.images = this.room.listImage
    this.image = this.images[0]
  }
}
