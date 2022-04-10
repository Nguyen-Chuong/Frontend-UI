import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { BenefitType } from 'src/app/_models/benefitType';
import { FacilityTypeRequest } from 'src/app/_models/facilityTypeRequest';
import { FacilityService } from 'src/app/_services/facility.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.scss']
})
export class FacilityComponent implements OnInit {
  currentTask= "Facility"
  formGroup: FormGroup;
  inputs: any[]
  max: number
  facilityTypeControl: FormControl
  facilityTypes: BenefitType[]
  constructor(
    private facilityService: FacilityService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      facilityType: new FormControl('', [Validators.required]),
      icon: new FormControl('', [Validators.required])
    })
    this.facilityService.getFacilityType().pipe(first()).subscribe(
      rs => {
        this.facilityTypes = rs['data']
      })
    this.max = 1
    this.inputs = Array.from({ length: this.max }, (_, i) => i + 1)
    console.log(this.inputs.length)
    this.facilityTypeControl = new FormControl('', Validators.required);
  }

  addFacilityType() {
    const facilityTypeRequest = new FacilityTypeRequest
    const val = this.formGroup.value
    facilityTypeRequest.name = val.benefitType
    facilityTypeRequest.icon = val.icon
    this.facilityService.addFacilityType(facilityTypeRequest).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Add successfully');
        window.location.reload()
      },
      error: err => {
        this.notificationService.onError('Add false')
      }
    })
  }

  moreInput(){
    this.max = this.max + 1
    this.inputs = Array.from({ length: this.max }, (_, i) => i + 1)
  }
}
