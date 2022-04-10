import { BenefitService } from './../../_services/benefit.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BenefitTypeRequest } from 'src/app/_models/benefitTypeRequest';
import { NotificationService } from 'src/app/_services/notification.service';
import { first } from 'rxjs';
import { BenefitType } from 'src/app/_models/benefitType';
import { BenefitRequest } from 'src/app/_models/benefitRequest';

@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.scss']
})
export class BenefitComponent implements OnInit {
  currentTask = "Benefit"
  formGroup: FormGroup;
  benefitTypes: BenefitType[]
  benefitRequests: BenefitRequest[]

  constructor(
    private benefitService: BenefitService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      benefitType: new FormControl('', [Validators.required]),
      icon: new FormControl('', [Validators.required])
    })
    this.benefitService.getBenefitType().pipe(first()).subscribe(
      rs => {
        this.benefitTypes = rs['data']
      })
  }

  addBenefitType() {
    const benefitTypeRequest = new BenefitTypeRequest
    const val = this.formGroup.value
    benefitTypeRequest.name = val.benefitType
    benefitTypeRequest.icon = val.icon

    this.benefitService.addBenefitType(benefitTypeRequest).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Add successfully');
        window.location.reload()
      },
      error: err => {
        this.notificationService.onError('Add false')
      }
    })
  }
}
