import { NotificationService } from 'src/app/_services/notification.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
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
        error: err => {
          this.notificationService.onError('Change password false');
          this.form.reset()
        }
      })
    }
  }

}
