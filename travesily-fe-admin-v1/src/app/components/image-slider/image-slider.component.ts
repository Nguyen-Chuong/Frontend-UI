import {Component, Input, OnInit} from '@angular/core';
import { Room } from 'src/app/_models/room';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {
@Input() roomDetail: Room = new Room()
  constructor() { }

  ngOnInit(): void {
  }

}
