import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { FacilityType } from 'src/app/_models/facilityType';
import { FacilityAddRequest } from 'src/app/_models/facilityAddRequest';
import { CryptoService } from 'src/app/_services/crypto.service';
import { FacilityService } from 'src/app/_services/facility.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { FacilityRequest } from 'src/app/_models/facilityRequest';

@Component({
  selector: 'app-add-facility',
  templateUrl: './add-facility.component.html',
  styleUrls: ['./add-facility.component.scss']
})
export class AddFacilityComponent implements OnInit {
  facilityGroup: FormGroup;
  facilityTypeControl: FormControl
  facilityTypes: FacilityType[]
  isDisable: boolean
  constructor(private formBuilder: FormBuilder,
    private facilityService: FacilityService,
    private notificationService: NotificationService,
    private cryptoService: CryptoService
  ) {
    this.facilityService.getFacilityType().pipe(first()).subscribe(
      rs => {
        this.facilityTypes = rs['data']
      })
    this.facilityTypeControl = new FormControl('', Validators.required);
    this.isDisable = true
  }

  ngOnInit() {
    this.facilityGroup = this.formBuilder.group({
      facilities: this.formBuilder.array([])
    })
  }

  addFacility(name = "", icon = "") {
    let facilities = this.facilityGroup.get('facilities') as FormArray;
    facilities.push(this.formBuilder.group({
      name: [name, [Validators.required]],
      icon: [icon]
    }));
    if (facilities.length === 0)
      this.isDisable = true
    else
      this.isDisable = false
  }

  saveFacility() {
    const val = this.facilityGroup.value
    const facilityAddRequests: FacilityAddRequest = new FacilityAddRequest
    const listFacilityRequest = []
    for (const facility of val.facilities) {
      const facilityRequest = new FacilityRequest()
      if (!facility.icon) {
        facilityRequest.icon = 'check'
      } else {
        facilityRequest.icon = facility.icon.match(/[A-Z][a-z]+|[0-9]+/g).join("_").toLowerCase()
      }
      facilityRequest.name = facility.name
      listFacilityRequest.push(facilityRequest)
    }
    facilityAddRequests.listFacility = listFacilityRequest
    const facilityTypeId = this.facilityTypeControl.value.id
    const encryptedId = this.cryptoService.set('06052000', facilityTypeId)
    this.facilityService.addFacility(facilityAddRequests, encryptedId).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Add successfully');
        window.location.reload()
      },
      error: () => {
        this.notificationService.onError('Add fail')
      }
    })
    this.facilityGroup.markAllAsTouched();
  }

  deleteFacility(index) {
    let facilities = this.facilityGroup.get('facilities') as FormArray;
    facilities.removeAt(index)
    if (facilities.length === 0)
      this.isDisable = true
    else
      this.isDisable = false
  }
}
