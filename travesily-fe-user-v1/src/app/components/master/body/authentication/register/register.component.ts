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
import {Account} from "../../../../../_models/account";
import {concatMap, first} from "rxjs";
import {AlertService} from "../../../../../_services/alert.service";
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

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private alertService: AlertService, private cryptoService: CryptoService, private activatedRoute: ActivatedRoute) {
    this.form = fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required], [UsernameValidator(this.authService)]],
      email: ['', [Validators.required, Validators.email], [EmailValidator(this.authService)]],
      password: ['', [Validators.required, this.matchValidator('confirmPassword', true),Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,}$/)]],
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

}
