import { AdminResponse } from './../../_models/admin-response';
import { Feedback } from './../../_models/feedback';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FeedbackService } from 'src/app/_services/feedback.service';
import { first } from 'rxjs';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  formGroup!: FormGroup;
  feedback: Feedback
  response: AdminResponse = new AdminResponse
  feedbackId: any
  constructor(
    private notificationService: NotificationService,
    private feedbackService: FeedbackService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({ message_response: new FormControl('', [Validators.required]) })

    this.route.queryParams.subscribe((param) => {
      this.feedbackId = param['id']
    })

    this.feedbackService.getFeedbackById(this.feedbackId).pipe(first()).subscribe(
      rs => {
        this.feedback = rs['data']
      }
    )
  }

  saveResponse() {
    console.log(this.formGroup.value.message_response)


    this.response.adminId = Number(localStorage.getItem('admin-id'))
    this.response.feedbackId = this.feedbackId
    this.response.username = this.feedback.senderName
    this.response.message = this.formGroup.value.message_response
    console.log(this.response.username)
    this.feedbackService.sendResponse(this.response).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Add new manager successfully');
        this.router.navigate(['feedback'], {
          queryParams: { page: JSON.stringify(0), size: JSON.stringify(5) }
        });
      },
      error: err => {
        this.notificationService.onError('Add new manager false')
      }
    })
  }

}
