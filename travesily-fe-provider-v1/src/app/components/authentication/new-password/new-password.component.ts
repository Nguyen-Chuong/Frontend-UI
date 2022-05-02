import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
      password: ['', [Validators.required, this.matchValidator('confirmPassword', true), Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required, this.matchValidator('password')]]
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
        : { matching: true };
    }
  }

  onSave() {
    if (this.form.value.password && this.form.value.confirmPassword) {
      this.authService.resetPassword(this.encryptedEmail, this.form.value.password).subscribe({
        next: rs => {
          this.router.navigateByUrl('/login').then(() => {
            this.notificationService.onSuccess('Change password successfully')
          })
        },
        error: err => this.notificationService.onError(err)
      }
      )
    }
  }

  getErrorMessage(field: string) {
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
