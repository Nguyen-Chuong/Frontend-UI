import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { first } from 'rxjs';
import { FeedbackService } from 'src/app/_services/feedback.service';
import { Feedback } from './../../_models/feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  currentTask = "Feedback"
  feedbacks: Feedback[]
  pageSize: number = 0
  total: number

  constructor(
    private feedbackService: FeedbackService) { }
  ngOnInit(): void {

    this.feedbackService.getAllFeedback().pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
      }
    )
    this.feedbackService.getFeedback(0, 5).pipe(first()).subscribe(
      rs => {
        this.feedbacks = rs['data']['items']
        this.pageSize = rs['data']['pageSize']
      }
    )
  }
  getPaginatorData(event: PageEvent) {
    this.feedbackService.getFeedback(event.pageIndex, event.pageSize).pipe(first()).subscribe(
      rs => {
        this.feedbacks = rs['data']['items']
      }
    )
  }

}
