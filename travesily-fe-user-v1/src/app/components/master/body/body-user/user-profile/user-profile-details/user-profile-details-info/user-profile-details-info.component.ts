import {Component, Input, OnInit} from '@angular/core';
import {Account} from "../../../../../../../_models/account";

@Component({
  selector: 'app-user-profile-details-info',
  templateUrl: './user-profile-details-info.component.html',
  styleUrls: ['./user-profile-details-info.component.scss']
})
export class UserProfileDetailsInfoComponent implements OnInit {
  @Input() account: Account
  @Input() title: string | undefined
  @Input() avatar: string | undefined
  @Input() detail: string | undefined
  @Input() isAdd: boolean | undefined
  @Input() editType: string | undefined
  isEditShow: boolean = false

  constructor() {
  }

  ngOnInit(): void {
  }

  dropdown() {
    this.isEditShow = !this.isEditShow
  }

}
