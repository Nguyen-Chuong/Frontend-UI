import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { CryptoService } from 'src/app/_services/crypto.service';
import { EmailValidator } from 'src/app/_validators/email.validator';
import { UsernameValidator } from 'src/app/_validators/username.validator';
import { NotificationService } from './../../../_services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    private cryptoService: CryptoService,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = fb.group({
      username: ['', [Validators.required], [UsernameValidator(this.authService)]],
      email: ['', [Validators.required, Validators.email], [EmailValidator(this.authService)]],
      password: ['', [Validators.required, Validators.minLength(8), this.matchValidator('confirmPassword', true)]],
      confirmPassword: ['', [Validators.required, this.matchValidator('password')]],
    })
  }

  ngOnInit(): void {
  }

  submit() {
    const val = this.form.value
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        this.router.navigate(['otp-checker'], {
          queryParams: {
            url: value['url'],
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
      return !!control.parent &&
        !!control.parent.value &&
        control.value ===
        (control.parent?.controls as any)[matchTo].value
        ? null
        : { matching: true };
    }
  }

}
