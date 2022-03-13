import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Account} from "../../../../../../../_models/account";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../../../../../../_services/auth.service";
import {first} from "rxjs";
import {AlertService} from "../../../../../../../_services/alert.service";

@Component({
  selector: 'app-edit-dropdown-password',
  templateUrl: './edit-dropdown-password.component.html',
  styleUrls: ['./edit-dropdown-password.component.scss']
})
export class EditDropdownPasswordComponent implements OnInit {
  @Input() account: Account
  @Output() dropdown = new EventEmitter()
  form: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      oldPass: ['', Validators.required],
      newPass: ['', [Validators.required, this.matchValidator('confirmNewPass', true)]],
      confirmNewPass: ['', [Validators.required, this.matchValidator('newPass')]]
    })
  }

  matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity()
        }
        return null
      }
      return !!control.parent &&
      !!control.parent.value &&
      control.value ===
      (control.parent?.controls as any)[matchTo].value
        ? null
        : {matching: true};
    }
  }

  onSave() {
    const val = this.form.value
    if (val.oldPass && val.newPass) {
      this.authService.changePassword(val.oldPass, val.newPass).pipe(first()).subscribe({
        next: () => {
          console.log('Change pass success')
          this.form.reset()
          this.alertService.success('Change Password Successfully')
          this.dropdown.emit()
        },
        error: err => {
          this.alertService.error(err)
          this.form.reset()
        }
      })
    }
  }
}
