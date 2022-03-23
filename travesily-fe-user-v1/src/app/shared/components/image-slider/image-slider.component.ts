import {Component, Input, OnInit} from '@angular/core';
import {RoomDetail} from "../../../_models/room-detail";

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {
@Input() roomDetail: RoomDetail = new RoomDetail()
  constructor() { }

  ngOnInit(): void {
  }

}
