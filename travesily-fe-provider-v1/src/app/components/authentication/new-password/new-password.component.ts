import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  encryptedEmail: string
  form: FormGroup

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      newPass: ['', [Validators.required, this.matchValidator('confirmNewPass', true)]],
      confirmNewPass: ['', [Validators.required, this.matchValidator('newPass')]]
    })
    this.activatedRoute.queryParams.subscribe(rs => {
      this.encryptedEmail = rs['encryptedEmail']
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
    if (this.form.value.newPass && this.form.value.confirmNewPass) {
      this.authService.resetPassword(this.encryptedEmail, this.form.value.newPass).pipe(first()).subscribe(
        rs => {
          this.router.navigateByUrl('/login').then(() => {
            this.notificationService.onSuccess('Change password successfully')
          })

        },
        error => {
          this.notificationService.onError(error)
        }
      )
    }
  }

}
