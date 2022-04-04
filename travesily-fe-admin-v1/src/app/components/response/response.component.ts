import { FeedbackRequest } from './../../_models/feedback-request';
import { AdminResponse } from './../../_models/admin-response';
import { Feedback } from './../../_models/feedback';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FeedbackService } from 'src/app/_services/feedback.service';
import { first } from 'rxjs';
import { NotificationService } from 'src/app/_services/notification.service';
import { CryptoService } from 'src/app/_services/crypto.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  formGroup!: FormGroup;
  feedback: Feedback
  responses: AdminResponse[]
  response: AdminResponse = new AdminResponse
  feedbackId: any
  isAdmin = false
  constructor(
    private notificationService: NotificationService,
    private feedbackService: FeedbackService,
    private router: Router,
    private route: ActivatedRoute,
    private cryptoService: CryptoService
  ) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({ message_response: new FormControl('', [Validators.required]) })

    this.route.queryParams.subscribe((param) => {
      this.feedbackId = param['id'].slice(1, -1);
    })

    this.feedbackService.getFeedbackById(this.feedbackId).pipe(first()).subscribe(
      rs => {
        this.feedback = rs['data']
      }
    )

    this.feedbackService.getResponseByFeedbackId(this.feedbackId).pipe(first()).subscribe(
      rs => {
        this.responses = rs['data']
        if (this.responses[0].adminId === Number(localStorage.getItem('admin-id')) || this.formGroup.value.message_response === null) {
          this.isAdmin = true
        }
      }
    )


  }

  saveResponse() {
    this.response.adminId = Number(localStorage.getItem('admin-id'))
    this.response.feedbackId = Number(this.cryptoService.get('06052000', this.feedbackId))
    this.response.username = this.feedback.senderName
    this.response.message = this.formGroup.value.message_response
    const feedBackRequest: FeedbackRequest = new FeedbackRequest
    feedBackRequest.message = this.formGroup.value.message_response
    console.log(this.feedback.email)
    this.feedbackService.sendResponse(this.response).pipe(first()).subscribe({
      next: () => {
        this.sendMailResponseFeedback(this.cryptoService.set('06052000', this.feedback.email), feedBackRequest)
      },
      error: err => {
        this.notificationService.onError('Send response false ' + err)
      }
    })
  }

  sendMailResponseFeedback(email: string, feedBackRequest: FeedbackRequest) {
    this.feedbackService.sendMailResponseFeedback(email, feedBackRequest).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Send response successfully');
        window.location.reload()
      },
      error: err => {
        this.notificationService.onError('Send response false ' + err)
      }
    })
  }

}
