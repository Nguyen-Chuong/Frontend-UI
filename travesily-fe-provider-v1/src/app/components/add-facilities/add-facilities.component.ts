import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { BenefitType } from 'src/app/_models/benefitType';
import { Facility } from 'src/app/_models/facility';
import { FacilityRequest } from 'src/app/_models/facilityRequest';
import { FacilityType } from 'src/app/_models/facilityType';
import { FacilitiesService } from 'src/app/_services/facilities.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { CryptoService } from '../../../../../travesily-fe-admin-v1/src/app/_services/crypto.service';

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
  constructor(private facilitiesService: FacilitiesService,
    private cryptoService: CryptoService,
    private notificationService: NotificationService
  ) {
    this.facilityTypeControl = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    this.facilitiesService.getFacilitiesType().pipe(first()).subscribe(res => {
      this.facilityTypes = res['data']
    })
  }

  changeFacilityType(type: BenefitType) {
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

  submit() {
    let roomTypeId
    if(this.roomTypeId){
      roomTypeId = this.roomTypeId
    }else{
      roomTypeId = Number(localStorage.getItem('room-id'))
    }
    const facilityRequest = new FacilityRequest
    facilityRequest.roomTypeId = roomTypeId
    facilityRequest.facilityIds = this.checkedList
    this.facilitiesService.addListFacilities(facilityRequest).pipe(first())
      .subscribe({
        next: (res) => {
          this.notificationService.onSuccess("Add Hotel Successfully")
        }, error: error => {
          this.notificationService.onError(error['message'])
          console.log(error['error'])
          console.log(this.checkedList)
        }
      })
  }

}
