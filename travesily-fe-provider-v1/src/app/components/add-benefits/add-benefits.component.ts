import { BenefitRequest } from './../../_models/benefitRequest';
import { NotificationService } from 'src/app/_services/notification.service';
import { CryptoService } from 'src/app/_services/crypto.service';
import { BenefitsService } from './../../_services/benefits.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BenefitType } from 'src/app/_models/benefitType';
import { first } from 'rxjs';
import { Benefit } from 'src/app/_models/benefit';

@Component({
  selector: 'app-add-benefits',
  templateUrl: './add-benefits.component.html',
  styleUrls: ['./add-benefits.component.scss']
})
export class AddBenefitsComponent implements OnInit {
  @Input() roomTypeId: number
  benefitTypes: BenefitType[]
  benefitTypeControl: FormControl
  benefits: Benefit[]
  selectedItemsList = [];
  checkedList = [];
  constructor(private benefitsService: BenefitsService,
    private cryptoService: CryptoService,
    private notificationService: NotificationService
  ) {
    this.benefitTypeControl = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    this.benefitsService.getBenefitType().pipe(first()).subscribe(res => {
      this.benefitTypes = res['data']
    })
  }

  changeBenefitType(type: BenefitType) {
    const encryptedId = this.cryptoService.set('06052000', type.id)
    this.benefitsService.getBenefitByType(encryptedId).pipe(first()).subscribe(res => {
      this.benefits = res['data']
    })
  }
  onCheckboxChange(benefit: Benefit, event) {
    if (event.target.checked) {
      this.checkedList.push(benefit.id);
    } else {
      for (var i = 0; i < this.benefits.length; i++) {
        if (this.checkedList[i] == benefit.id) {
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
    const benefitRequest = new BenefitRequest
    benefitRequest.roomTypeId = roomTypeId
    benefitRequest.benefitIds = this.checkedList
    this.benefitsService.addListBenefit(benefitRequest).pipe(first())
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
