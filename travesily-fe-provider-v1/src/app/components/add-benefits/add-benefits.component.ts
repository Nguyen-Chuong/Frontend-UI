import { OtherBenefitRequest } from './../../_models/other-benefit-request';
import { BenefitRequest } from './../../_models/benefitRequest';
import { NotificationService } from 'src/app/_services/notification.service';
import { CryptoService } from 'src/app/_services/crypto.service';
import { BenefitsService } from './../../_services/benefits.service';
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BenefitType } from 'src/app/_models/benefitType';
import { first } from 'rxjs';
import { Benefit } from 'src/app/_models/benefit';
import {RoomBenefit} from "../../_models/roomBenefit";

@Component({
  selector: 'app-add-benefits',
  templateUrl: './add-benefits.component.html',
  styleUrls: ['./add-benefits.component.scss']
})
export class AddBenefitsComponent implements OnInit, OnChanges {
  @Input() isShow: boolean = false
  @Input() roomTypeId: number
  form: FormGroup
  benefitTypes: BenefitType[]
  benefitTypeControl: FormControl
  benefits: Benefit[]
  selectedItemsList = [];
  checkedList = [];
  listBenefits: RoomBenefit[] = []
  isOtherType = false
  constructor(private benefitsService: BenefitsService,
    private cryptoService: CryptoService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.benefitTypeControl = new FormControl('', Validators.required);
    this.form = fb.group({
      name: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    const encryptedId = this.cryptoService.set('06052000', this.roomTypeId!)
    this.benefitsService.getBenefitOfRoom(encryptedId).pipe(first()).subscribe(res => {
      this.listBenefits = res['data']
    })
    this.benefitsService.getBenefitType().pipe(first()).subscribe(res => {
      this.benefitTypes = res['data']
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.roomTypeId = changes['roomTypeId']['currentValue']
    const encryptedId = this.cryptoService.set('06052000', this.roomTypeId!)
    this.benefitsService.getBenefitOfRoom(encryptedId).pipe(first()).subscribe(res => {
      this.listBenefits = res['data']
    })
  }

  changeBenefitType(type: BenefitType) {
    if (type.name === "Other") {
      this.isOtherType = true
    } else {
      this.isOtherType = false
    }
    const encryptedId = this.cryptoService.set('06052000', type.id)
    this.benefitsService.getBenefitByType(encryptedId).pipe(first()).subscribe(res => {
      this.benefits = res['data']
    })
    this.checkedList.length = 0
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

  addBenefitOtherType() {
    const val = this.form.value
    const otherBenefitRequest = new OtherBenefitRequest
    otherBenefitRequest.name = val.name
    this.benefitsService.addBenefitOtherType(otherBenefitRequest).pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.onSuccess("Add Successfully")
          const encryptedId = this.cryptoService.set('06052000', 1)
          this.benefitsService.getBenefitByType(encryptedId).pipe(first()).subscribe(res => {
            this.benefits = res['data']
          })
          this.form.reset()
        }, error: () => {
          this.notificationService.onError('Some benefit has exist in this room')
        }
      })
  }

  submit() {
    if (this.roomTypeId) {
      const benefitRequest = new BenefitRequest
      benefitRequest.roomTypeId = this.roomTypeId
      benefitRequest.benefitIds = this.checkedList
      this.benefitsService.addListBenefit(benefitRequest).pipe(first())
        .subscribe({
          next: () => {
            this.notificationService.onSuccess("Add Benefit Successfully")
          }, error: () => {
            this.notificationService.onError('Some benefit has exist in this room, please try again!')
          }
        })
    } else
      this.notificationService.onError('You must add room first')
  }
}
