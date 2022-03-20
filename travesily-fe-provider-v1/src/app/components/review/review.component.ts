import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/_models/review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input() review: Review
  cleanliness: number
  facilities: number
  location: number
  service: number
  constructor() { }

  ngOnInit(): void {
    this.cleanliness = this.review.cleanliness * 10
    this.facilities = this.review.facilities * 10
    this.location = this.review.location * 10
    this.service = this.review.service * 10
  }

}
