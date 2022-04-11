import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../../../_services/auth.service";
import {Account} from "../../../../../_models/account";
import {first} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../../../_services/alert.service";
import {CryptoService} from "../../../../../_services/crypto.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-otp-checker',
  templateUrl: './otp-checker.component.html',
  styleUrls: ['./otp-checker.component.scss']
})
export class OtpCheckerComponent implements OnInit, OnDestroy {
  encryptedEmail: string
  account: Account = new Account()
  isRegister: boolean = false
  @ViewChild('ngOtpInput') ngOtpInputRef: any;

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService, private cryptoService: CryptoService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      rs => {
        this.encryptedEmail = rs['encryptedEmail']
        if (rs['encryptedUsername']) {
          this.isRegister = true
          this.account.email = this.cryptoService.get('06052000', rs['encryptedEmail'])
          this.account.username = this.cryptoService.get('06052000', rs['encryptedUsername'])
          this.account.password = this.cryptoService.get('06052000', rs['encryptedPassword'])
          this.account.firstname = rs['firstname']
          this.account.lastname = rs['lastname']
        }
        this.authService.generateOtp(this.encryptedEmail).pipe(first()).subscribe(
          rs => {
            this.alertService.success('We have sent you an email with OTP code')
          },
          error => this.alertService.error(error)
        )
      }
    )
  }

  ngOnDestroy() {
  }

  onOtpChange($event: string) {
    if ($event.length === 6) {
      this.authService.verifyOtp(this.encryptedEmail, this.cryptoService.set('06052000', $event)).subscribe(
        rs => {
          if (this.isRegister) {
            this.authService.register(this.account).subscribe({
                next: () => {
                  this.authService.login(this.account.email, this.account.password).subscribe(() => {
                    this.activatedRoute.queryParams.subscribe({
                      next: value => {
                        Swal.fire('Register Successfully!','','success').then(() => {
                          this.router.navigateByUrl(value['url'] ? value['url'] : '/user/profile').then(() => {
                            window.location.reload()
                          })
                        })
                      }
                    })
                  })
                }, error: () => {
                  this.alertService.error('Register Failed')
                }
              }
            )
          } else {
            this.router.navigate(['/authentication/new-password'], {
              queryParams: {encryptedEmail: this.encryptedEmail}
            })
          }
        },
        error => this.alertService.error(error)
      )
      this.ngOtpInputRef.otpForm.disable()
    }
  }

  resend() {
    this.ngOtpInputRef.otpForm.enable()
    this.ngOtpInputRef.otpForm.reset()
    this.authService.generateOtp(this.encryptedEmail).subscribe(
      rs => {
        this.alertService.success('We have sent you a new email with OTP code')
      },
      error => this.alertService.error(error)
    )
  }
}
