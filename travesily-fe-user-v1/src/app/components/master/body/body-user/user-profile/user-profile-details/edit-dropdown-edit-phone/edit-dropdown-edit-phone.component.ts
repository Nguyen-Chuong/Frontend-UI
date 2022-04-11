import {Component, Input, OnInit} from '@angular/core';
import {Account} from "../../../../../../../_models/account";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-dropdown-edit-phone',
  templateUrl: './edit-dropdown-edit-phone.component.html',
  styleUrls: ['./edit-dropdown-edit-phone.component.scss']
})
export class EditDropdownEditPhoneComponent implements OnInit {
  @Input() account: Account
  form: FormGroup
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      oldPass: ['', Validators.required],
      newPass: ['', Validators.required],
    })
  }
}
