import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {AuthService} from "../../../../../_services/auth.service";
import {AlertService} from "../../../../../_services/alert.service";
import {first} from "rxjs";
import {ActivatedRoute, Route, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  encryptedEmail: string
  form: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private alertService: AlertService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      newPass: ['', [Validators.required, this.matchValidator('confirmNewPass', true), Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,}$/)]],
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
      return !!control.parent && !!control.parent.value && control.value === (control.parent?.controls as any)[matchTo].value ? null : {matching: true};
    }
  }

  onSave() {
    if (this.form.value.newPass && this.form.value.confirmNewPass) {
      this.authService.resetPassword(this.encryptedEmail, this.form.value.newPass).subscribe({
          next: rs => {
            this.router.navigateByUrl('/authentication/login').then(() => {
              Swal.fire('Change password successfully', '', 'success')
            })
          },
          error: err => this.alertService.error(err)
        }
      )
    }
  }

  getErrorMessage(field: string) {
    if (field === 'newPass' && this.form.controls['newPass'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'confirmNewPass' && this.form.controls['confirmNewPass'].hasError('required')) {
      return 'You must enter a value';
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
