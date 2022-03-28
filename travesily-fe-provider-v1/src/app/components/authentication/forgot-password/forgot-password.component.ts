import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { CryptoService } from 'src/app/_services/crypto.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private notificationService: NotificationService,
              private cryptoService: CryptoService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {

  }

  click() {
    this.authService.checkEmailDuplicated(this.form.value.email).pipe(first()).subscribe(
      rs => {
        if (rs['data'] === true) {

          this.router.navigate(['otp-checker'], {
            queryParams: {
              encryptedEmail: this.cryptoService.set('06052000', this.form.value.email)
            }
          })
        } else {
          this.notificationService.onError('There is no account registered with this email')
          this.form.reset()
        }
      },
      error => {
        this.notificationService.onError(error)
      }
    )

  }

}
