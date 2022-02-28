import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../../../_services/auth.service";
import {Account} from "../../../../../_models/account";
import {first} from "rxjs";
import {Router} from "@angular/router";
import {AlertService} from "../../../../../_services/alert.service";

@Component({
  selector: 'app-otp-checker',
  templateUrl: './otp-checker.component.html',
  styleUrls: ['./otp-checker.component.scss']
})
export class OtpCheckerComponent implements OnInit, OnDestroy {
  email: string
  isVerified: boolean = false

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {
    if (this.authService.accountStorage)
      this.email = this.authService.accountStorage.email
    else if (this.authService.emailStorage)
      this.email = this.authService.emailStorage

    this.authService.generateOtp(this.email).pipe(first()).subscribe(
      rs => {
        this.alertService.success('We have sent you an email with OTP code')
      },
      error => {
        this.alertService.error(error)
      }
    )
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    if (!this.isVerified) {
      this.authService.clearAccountStorage()
      this.authService.clearEmailStorage()
    }
  }

  onOtpChange($event: string) {
    if ($event.length === 6) {
      this.authService.verifyOtp(this.email, $event).pipe(first()).subscribe(
        rs => {
          if (this.authService.accountStorage) {
            const account: Account = this.authService.accountStorage
            this.authService.register(account)
              .pipe(first())
              .subscribe({
                  next: () => {
                    this.authService.login(account.email, account.password)
                      .pipe(first())
                      .subscribe(() => {
                        this.isVerified = true
                        this.router.navigateByUrl('/user/profile').then(() => {
                          this.alertService.success('Register Successful')
                          this.authService.clearAccountStorage()
                          window.location.reload()
                        })
                      })
                  }, error: error => {
                    this.alertService.error('Register Failed')
                  }
                }
              )
          } else if (this.authService.emailStorage) {
            this.isVerified = true
            this.router.navigateByUrl('/authentication/new-password')
          }
        },
        error => {
          this.alertService.error(error)
        }
      )
    }
  }

  resend() {
    this.authService.generateOtp(this.email).pipe(first()).subscribe(
      rs => {
        this.alertService.success('We have sent you a new email with OTP code')
      },
      error => {
        this.alertService.error(error)
      }
    )
  }
}
