import { BenefitService } from './../../_services/benefit.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      benefitType: new FormControl('', [Validators.required]),
      icon: new FormControl('')
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
    if (val.icon === null) {
      benefitTypeRequest.icon = 'check'
    } else {
      benefitTypeRequest.icon = val.icon.match(/[A-Z][a-z]+|[0-9]+/g).join("_").toLowerCase()
    }
    this.benefitService.addBenefitType(benefitTypeRequest).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Add successfully');
        window.location.reload()
      },
      error: () => {
        this.notificationService.onError('Add fail')
      }
    })
  }
  
  goToLink(url: string) {
    window.open(url, "_blank");
  }
}
