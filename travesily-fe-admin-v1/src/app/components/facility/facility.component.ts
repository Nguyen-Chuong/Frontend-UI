import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { FacilityType } from 'src/app/_models/facilityType';
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
  facilityTypes: FacilityType[]
  constructor(
    private facilityService: FacilityService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      facilityType: new FormControl('', [Validators.required]),
      icon: new FormControl('')
    })
    this.facilityService.getFacilityType().pipe(first()).subscribe(
      rs => {
        this.facilityTypes = rs['data']
      })
  }

  addFacilityType() {
    const facilityTypeRequest = new FacilityTypeRequest
    const val = this.formGroup.value
    facilityTypeRequest.name = val.facilityType
    facilityTypeRequest.icon = val.icon.match(/[A-Z][a-z]+|[0-9]+/g).join("_").toLowerCase( )
    this.facilityService.addFacilityType(facilityTypeRequest).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Add successfully');
        window.location.reload()
      },
      error: () => {
        this.notificationService.onError('Add fail')
      }
    })
  }
  goToLink(url: string){
    window.open(url, "_blank");
}
}
