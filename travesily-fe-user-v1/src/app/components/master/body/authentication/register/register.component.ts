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
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../../_services/auth.service";
import {UsernameValidator} from "../../../../../_validators/username.validator";
import {EmailValidator} from "../../../../../_validators/email.validator";
import {CryptoService} from "../../../../../_services/crypto.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup

  constructor(fb: FormBuilder, private router: Router, private authService: AuthService, private cryptoService: CryptoService, private activatedRoute: ActivatedRoute) {
    this.form = fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.maxLength(12)], [UsernameValidator(this.authService)]],
      email: ['', [Validators.required, Validators.email], [EmailValidator(this.authService)]],
      password: ['', [Validators.required, this.matchValidator('confirmPassword', true), Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required, this.matchValidator('password')]],
    })
  }

  ngOnInit(): void {
  }

  submit() {
    const val = this.form.value
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.router.navigate(['/authentication/otp-checker'], {
          queryParams: {
            url: value['url'],
            firstname: val.firstname,
            lastname: val.lastname,
            encryptedEmail: this.cryptoService.set('06052000', val.email),
            encryptedPassword: this.cryptoService.set('06052000', val.password),
            encryptedUsername: this.cryptoService.set('06052000', val.username),
          }
        })
      }
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

  getErrorMessage(field: string) {
    if (field === 'firstname' && this.form.controls['firstname'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'lastname' && this.form.controls['lastname'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'username' && this.form.controls['username'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'email' && this.form.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'password' && this.form.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'confirmPassword' && this.form.controls['confirmPassword'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'username' && this.form.controls['username'].hasError('duplicateUsername')) {
      return 'Username existed! Please choose another username!';
    }
    if (field === 'username' && this.form.controls['username'].hasError('maxlength')) {
      return 'Username can not have more than 12 character!';
    }
    if (field === 'email' && this.form.controls['email'].hasError('duplicateEmail')) {
      return 'This email has been registered!';
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
    return this.form.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }
}
