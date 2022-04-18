import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Facility } from 'src/app/_models/facility';
import { FacilityRequest } from 'src/app/_models/facilityRequest';
import { FacilityType } from 'src/app/_models/facilityType';
import { OtherFacilityRequest } from 'src/app/_models/other-facility-request';
import { CryptoService } from 'src/app/_services/crypto.service';
import { FacilitiesService } from 'src/app/_services/facilities.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-add-facilities',
  templateUrl: './add-facilities.component.html',
  styleUrls: ['./add-facilities.component.scss']
})
export class AddFacilitiesComponent implements OnInit {

  @Input() roomTypeId: number
  facilityTypes: FacilityType[]
  facilityTypeControl: FormControl
  facilities: Facility[]
  selectedItemsList = [];
  checkedList = [];
  isOtherType = false
  form: FormGroup
  constructor(private facilitiesService: FacilitiesService,
    private cryptoService: CryptoService,
    private notificationService: NotificationService,
    fb: FormBuilder
  ) {
    this.facilityTypeControl = new FormControl('', Validators.required);
    this.form = fb.group({
      name: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.facilitiesService.getFacilitiesType().pipe(first()).subscribe(res => {
      this.facilityTypes = res['data']
    })
  }

  changeFacilityType(type: FacilityType) {
    if (type.name === "Other") {
      this.isOtherType = true
    } else {
      this.isOtherType = false
    }
    const encryptedId = this.cryptoService.set('06052000', type.id)
    this.facilitiesService.getFacilitiesByType(encryptedId).pipe(first()).subscribe(res => {
      this.facilities = res['data']
    })
    this.checkedList.length = 0
  }
  onCheckboxChange(facility: Facility, event) {
    if (event.target.checked) {
      this.checkedList.push(facility.id);
    } else {
      for (var i = 0; i < this.facilities.length; i++) {
        if (this.checkedList[i] == facility.id) {
          this.checkedList.splice(i, 1);
        }
      }
    }
  }

  addFacilityOtherType() {
    const val = this.form.value
    const otherFacilityRequest = new OtherFacilityRequest
    otherFacilityRequest.name = val.name
    this.facilitiesService.addFacilityOtherType(otherFacilityRequest).pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.onSuccess("Add Successfully")
          const encryptedId = this.cryptoService.set('06052000', 1)
          this.facilitiesService.getFacilitiesByType(encryptedId).pipe(first()).subscribe(res => {
            this.facilities = res['data']
          })
          this.form.reset()
        }, error: error => {
          console.log(error)
          this.notificationService.onError(error['message'])
        }
      })
  }

  submit() {
    let roomTypeId
    if (this.roomTypeId) {
      roomTypeId = this.roomTypeId
    } else {
      roomTypeId = Number(localStorage.getItem('room-id'))
    }
    const facilityRequest = new FacilityRequest
    facilityRequest.roomTypeId = roomTypeId
    facilityRequest.facilityIds = this.checkedList
    this.facilitiesService.addListFacilities(facilityRequest).pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.onSuccess("Add Facility Successfully")
        }, error: error => {
          this.notificationService.onError(error['message'])
        }
      })
  }

}
