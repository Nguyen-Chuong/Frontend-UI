import { NotificationService } from 'src/app/_services/notification.service';
import { VipService } from './../../_services/vip.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vip } from 'src/app/_models/vip';
import { first } from 'rxjs';

@Component({
  selector: 'app-update-vip',
  templateUrl: './update-vip.component.html',
  styleUrls: ['./update-vip.component.scss']
})
export class UpdateVipComponent implements OnInit {
  @Input() vip: Vip

  formGroup: FormGroup;
  constructor(
    private vipService: VipService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      rangeStart: new FormControl(this.vip.rangeStart, [Validators.required]),
      rangeEnd: new FormControl(this.vip.rangeEnd, [Validators.required]),
      discount: new FormControl(this.vip.discount, [Validators.required]),
    })
  }

  updateVip(){
    const val = this.formGroup.value
    this.vipService.updateVip(val.discount, val.rangeStart, val.rangeEnd, this.vip.id).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Update Vip successfully');
      },
      error: () => {
        this.notificationService.onError('Update Vip fail')
      }
    })
  }
}
