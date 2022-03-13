import {Component, Input, OnInit} from '@angular/core';
import {Account} from "../../../../../../../_models/account";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../../../../_services/auth.service";
import {first} from "rxjs";

@Component({
  selector: 'app-edit-dropdown-add-phone',
  templateUrl: './edit-dropdown-add-phone.component.html',
  styleUrls: ['./edit-dropdown-add-phone.component.scss']
})
export class EditDropdownAddPhoneComponent implements OnInit {
  @Input() account: Account
  form: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]]
    })
  }

  onSubmit() {
    const val = this.form.value
    if(val.phone){
      this.account.phone = val.phone
      this.authService.update(this.account).pipe(first()).subscribe({
        next: () => {
          console.log('success')
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }
}
