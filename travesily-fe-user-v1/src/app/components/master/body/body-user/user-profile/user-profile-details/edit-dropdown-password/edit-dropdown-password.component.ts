import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Account} from "../../../../../../../_models/account";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../../../../../../_services/auth.service";
import {first} from "rxjs";
import {AlertService} from "../../../../../../../_services/alert.service";
import Swal from 'sweetalert2'

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
      oldPass: ['', [Validators.required,Validators.minLength(8)]],
      newPass: ['', [Validators.required, this.matchValidator('confirmNewPass', true), Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,}$/)]],
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
          this.form.reset()
          Swal.fire('Change password successfully!', '', 'success')
          this.dropdown.emit()
        },
        error: err => {
          Swal.fire('Change password failed!', 'Please check your old password!', 'error')
          this.form.reset()
        }
      })
    }
  }

  getErrorMessage(field: string) {
    if (field === 'oldPass' && this.form.controls['oldPass'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'newPass' && this.form.controls['newPass'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'confirmNewPass' && this.form.controls['confirmNewPass'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'oldPass' && this.form.controls['oldPass'].hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    if (field === 'newPass' && this.form.controls['newPass'].hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    if (field === 'newPass' && this.form.controls['newPass'].hasError('pattern')) {
      return 'Password must contains at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!';
    }
    if (field === 'confirmNewPass' && this.form.controls['confirmNewPass'].hasError('matching')) {
      return 'Confirm password not match! Please re-check!';
    }
    return this.form.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }
  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }
}
