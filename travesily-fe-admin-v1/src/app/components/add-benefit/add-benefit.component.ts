import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { BenefitRequest } from 'src/app/_models/benefitRequest';
import { BenefitType } from 'src/app/_models/benefitType';
import { CryptoService } from 'src/app/_services/crypto.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { BenefitAddRequest } from './../../_models/benefitAddRequest';
import { BenefitService } from './../../_services/benefit.service';

@Component({
  selector: 'app-add-benefit',
  templateUrl: './add-benefit.component.html',
  styleUrls: ['./add-benefit.component.scss']
})
export class AddBenefitComponent implements OnInit {
  benefitGroup: FormGroup;
  benefitTypeControl: FormControl
  benefitTypes: BenefitType[]
  benefitRequests = []
  isDisable: boolean

  constructor(private formBuilder: FormBuilder,
    private benefitService: BenefitService,
    private notificationService: NotificationService,
    private cryptoService: CryptoService
  ) {
    this.benefitService.getBenefitType().pipe(first()).subscribe(
      rs => {
        this.benefitTypes = rs['data']
      })
    this.benefitTypeControl = new FormControl('', Validators.required);
    this.isDisable = true
  }

  ngOnInit() {
    this.benefitGroup = this.formBuilder.group({
      benefits: this.formBuilder.array([])
    })
  }

  addProduct(name = "", icon = "") {
    let benefits = this.benefitGroup.get('benefits') as FormArray;
    benefits.push(this.formBuilder.group({
      name: [name, [Validators.required]],
      icon: [icon]
    }));
    if (benefits.length === 0)
      this.isDisable = true
    else
      this.isDisable = false
  }

  saveBenefit() {
    const val = this.benefitGroup.value
    const benefitAddRequests: BenefitAddRequest = new BenefitAddRequest
    const listBenefitRequest = []
    for (const benefit of val.benefits) {
      const benefitRequest = new BenefitRequest()
      if(benefit.icon === null){
        benefitRequest.icon = 'check'
      }else{
        benefitRequest.icon = benefit.icon.match(/[A-Z][a-z]+|[0-9]+/g).join("_").toLowerCase()
      }
      benefitRequest.name = benefit.name
      listBenefitRequest.push(benefitRequest)
    }
    benefitAddRequests.listBenefit = listBenefitRequest
    const benefitTypeId = this.benefitTypeControl.value.id
    const encryptedId = this.cryptoService.set('06052000', benefitTypeId)
    this.benefitService.addBenefit(benefitAddRequests, encryptedId).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Add successfully');
        window.location.reload()
      },
      error: () => {
        this.notificationService.onError('Add fail')
      }
    })
    this.benefitGroup.markAllAsTouched();
  }

  deleteBenefit(index) {
    let benefits = this.benefitGroup.get('benefits') as FormArray;
    benefits.removeAt(index)
    if (benefits.length === 0)
      this.isDisable = true
    else
      this.isDisable = false
  }
}
