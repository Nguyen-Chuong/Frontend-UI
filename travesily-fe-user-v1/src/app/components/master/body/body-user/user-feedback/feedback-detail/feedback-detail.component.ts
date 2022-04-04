import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Feedback} from "../../../../../../_models/feedback";
import {FeedbackService} from "../../../../../../_services/feedback.service";
import Swal from "sweetalert2";
import {Response} from "../../../../../../_models/response";
import {FeedbackRequest} from "../../../../../../_models/feedback-request";
import {ResponseRequest} from "../../../../../../_models/response-request";
import {AuthService} from "../../../../../../_services/auth.service";
import {Account} from "../../../../../../_models/account";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CryptoService} from "../../../../../../_services/crypto.service";

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.scss']
})
export class FeedbackDetailComponent implements OnInit {
  responses: Response[] = []
  feedbackId: string
  decryptedFeedbackId: number
  account: Account = new Account()
  messageForm: FormGroup

  constructor(private activatedRoute: ActivatedRoute,
              private feedbackService: FeedbackService,
              private authService: AuthService,
              private fb: FormBuilder,
              private cryptoService: CryptoService) {
    this.activatedRoute.queryParams.subscribe({
      next: params => {
        this.feedbackId = params['feedbackId']
        this.decryptedFeedbackId = +this.cryptoService.get('06052000', this.feedbackId)
        this.feedbackService.getFeedbackResponses(params['feedbackId']).subscribe({
          next: responses => {
            this.responses = responses['data']
            this.responses = this.responses.sort((n1, n2) => {
              return new Date(n1.modifyDate).getTime() - new Date(n2.modifyDate).getTime()
            })
          }
        })
      }
    })
    this.authService.getProfile().subscribe({
      next: account => {
        this.account = account['data']
      }
    })
  }


  ngOnInit(): void {
    this.messageForm = this.fb.group({
      message: ['', Validators.required]
    })
  }

  checkOverload() {
    if (this.responses[this.responses.length - 1].sendBy === 2
      && this.responses[this.responses.length - 2].sendBy === 2
      && this.responses[this.responses.length - 3].sendBy === 2
      && this.responses[this.responses.length - 4].sendBy === 2
      && this.responses[this.responses.length - 5].sendBy === 2) {
      return true
    } else return false
  }

  sendMessage() {
    if (this.checkOverload())
      Swal.fire('You can not send more than 5 consecutive message.\n' +
        'Please wait for our admin to response!', '', 'error')
    else {
      if (this.messageForm.value.message) {
        const responseRequest: ResponseRequest = new ResponseRequest()
        responseRequest.feedbackId = this.decryptedFeedbackId
        responseRequest.userId = this.account.id
        responseRequest.message = this.messageForm.value.message
        this.feedbackService.sendResponse(responseRequest).subscribe({
          next: value => {
            this.feedbackService.getFeedbackResponses(this.feedbackId).subscribe({
              next: responses => {
                this.responses = responses['data']
                this.responses = this.responses.sort((n1, n2) => {
                  return new Date(n1.modifyDate).getTime() - new Date(n2.modifyDate).getTime()
                })
                this.messageForm.reset()
              }
            })
          }
        })
      }
    }
  }
}
