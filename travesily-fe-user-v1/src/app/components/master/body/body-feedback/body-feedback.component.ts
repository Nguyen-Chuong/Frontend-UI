import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FeedbackService} from "../../../../_services/feedback.service";
import {FeedbackRequest} from "../../../../_models/feedback-request";
import {AuthService} from "../../../../_services/auth.service";
import Swal from "sweetalert2";
import {StorageService} from "../../../../_services/storage.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-body-feedback',
  templateUrl: './body-feedback.component.html',
  styleUrls: ['./body-feedback.component.scss']
})
export class BodyFeedbackComponent implements OnInit {
  feedbackForm: FormGroup
  constructor(private fb: FormBuilder,
              private feedbackService: FeedbackService,
              private authService: AuthService,
              private storageService: StorageService,
              private router: Router) {
    console.log(this.storageService.authToken)
    if(this.storageService.authToken===null){
      Swal.fire('You must login first to access help center!','','warning').then(() => {
        this.router.navigate(['/authentication/login'],{queryParams: {
          url: this.router.url
          }})
      })
    }
  }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      reason: [0,[Validators.required, Validators.min(1)]],
      email: ['',[Validators.required, Validators.email]],
      phone: ['',[Validators.required]],
      requestDetail: ['', [Validators.required]]
    })

  }

  selectOption() {
    if(this.feedbackForm.value.reason ==1){
      this.feedbackForm.addControl('bookingId', new FormControl('', Validators.required))
    }
    else {
      this.feedbackForm.removeControl('bookingId')
    }
  }

  submit() {
    if(this.feedbackForm.valid){
      this.authService.getProfile().subscribe({
        next: value => {
          const val = this.feedbackForm.value
          const feedbackRequest = new FeedbackRequest()
          feedbackRequest.email = val.email
          feedbackRequest.phone = val.phone
          feedbackRequest.type = val.reason
          feedbackRequest.message = val.requestDetail
          feedbackRequest.senderId = value['data'].id
          if(this.feedbackForm.contains('bookingId'))
            feedbackRequest.bookingId = val.bookingId
          this.feedbackService.sendFeedback(feedbackRequest).subscribe({
            next: feedback => {
              Swal.fire('Your feedback has been recorded!','','success').then(() => {
                this.feedbackForm.reset()
                this.feedbackForm.get('reason').setValue(0)
              })
            }
          })
        }
      })

    }
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }
}
