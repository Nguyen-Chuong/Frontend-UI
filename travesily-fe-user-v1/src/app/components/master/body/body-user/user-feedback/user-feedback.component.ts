import { Component, OnInit } from '@angular/core';
import {FeedbackService} from "../../../../../_services/feedback.service";
import {Feedback} from "../../../../../_models/feedback";

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.scss']
})
export class UserFeedbackComponent implements OnInit {
   feedbacks: Feedback[] = []

  constructor(private feedbackService: FeedbackService) {
    this.feedbackService.listFeedback().subscribe({
      next: feedbacks => {
        this.feedbacks = feedbacks['data']
      }
    })
  }

  ngOnInit(): void {
  }

}
