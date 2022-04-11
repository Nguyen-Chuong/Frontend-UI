import { NotificationService } from 'src/app/_services/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { first } from 'rxjs';
import { Account } from 'src/app/_models/account';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  account: Account = new Account
  form: FormGroup

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService) {
    authService.getProfile().pipe(first()).subscribe(account => {
      this.account = account['data']
    })
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      oldPass: ['', Validators.required],
      password: ['', [Validators.required, this.matchValidator('confirmPassword', true)]],
      confirmPassword: ['', [Validators.required, this.matchValidator('password')]]
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
        : { matching: true };
    }
  }

  onSave() {
    const val = this.form.value
    if (val.oldPass && val.newPass) {
      this.authService.changePassword(val.oldPass, val.newPass).pipe(first()).subscribe({
        next: () => {
          this.notificationService.onSuccess('Change password successfully');
          this.form.reset()
        },
        error: () => {
          this.notificationService.onError('Change password fail');
          this.form.reset()
        }
      })
    }
  }

  getErrorMessage(field: string) {
    if (field === 'oldPass' && this.form.controls['oldPass'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'oldPass' && this.form.controls['oldPass'].hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    if (field === 'password' && this.form.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'confirmPassword' && this.form.controls['confirmPassword'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'password' && this.form.controls['password'].hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    if (field === 'password' && this.form.controls['password'].hasError('pattern')) {
      return 'Password must contains at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!';
    }
    if (field === 'confirmPassword' && this.form.controls['confirmPassword'].hasError('matching')) {
      return 'Confirm password not match! Please re-check!';
    }
    return ''
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }
}
