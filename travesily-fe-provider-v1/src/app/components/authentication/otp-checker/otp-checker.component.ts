import { NotificationService } from './../../../_services/notification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { first } from 'rxjs';
import { Account } from 'src/app/_models/account';
import { AuthService } from 'src/app/_services/auth.service';
import { CryptoService } from 'src/app/_services/crypto.service';

@Component({
  selector: 'app-otp-checker',
  templateUrl: './otp-checker.component.html',
  styleUrls: ['./otp-checker.component.scss']
})
export class OtpCheckerComponent implements OnInit {
  encryptedEmail: string
  account: Account = new Account()
  isRegister: boolean = false
  @ViewChild('ngOtpInput') ngOtpInputRef: any;

  constructor(private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private cryptoService: CryptoService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      rs => {
        this.encryptedEmail = rs['encryptedEmail']
        if (rs['encryptedUsername']) {
          this.isRegister = true
          this.account.email = this.cryptoService.get('06052000', rs['encryptedEmail'])
          this.account.username = this.cryptoService.get('06052000', rs['encryptedUsername'])
          this.account.password = this.cryptoService.get('06052000', rs['encryptedPassword'])
        }
        this.authService.generateOtp(this.encryptedEmail).pipe(first()).subscribe(
          () => {
            this.notificationService.onSuccess('We have sent you an email with OTP code')
          },
          error => {
            this.notificationService.onError(error)
            console.log(error)
          }
        )
      }
    )
  }

  ngOnDestroy() {
  }

  onOtpChange($event: string) {
    if ($event.length === 6) {
      this.authService.verifyOtp(this.encryptedEmail, this.cryptoService.set('06052000', $event)).pipe(first()).subscribe(
        rs => {
          if (this.isRegister) {
            this.authService.register(this.account)
              .subscribe({
                next: () => {
                  this.authService.login(this.account.email, this.account.password)
                    .subscribe(() => {
                      this.activatedRoute.queryParams.subscribe({
                        next: () => {
                          this.notificationService.onSuccess('Register Successful')
                          this.router.navigate(['/login']);
                        }
                      })
                    })
                }, error: () => {
                  this.notificationService.onError('Register Failed')
                }
              })
          } else {
            this.router.navigate(['/new-password'], {
              queryParams: {
                encryptedEmail: this.encryptedEmail
              }
            })
          }
        },
        error => {
          this.notificationService.onError(error)
        }
      )
      this.ngOtpInputRef.otpForm.disable()
    }
  }

  resend() {
    this.ngOtpInputRef.otpForm.enable()
    this.ngOtpInputRef.otpForm.reset()
    this.authService.generateOtp(this.encryptedEmail).pipe(first()).subscribe(
      rs => {
        this.notificationService.onSuccess('We have sent you a new email with OTP code')
      },
      error => {
        this.notificationService.onError(error)
      }
    )
  }
}
