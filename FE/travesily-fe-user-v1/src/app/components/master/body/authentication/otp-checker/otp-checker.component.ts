import {Component, OnInit} from '@angular/core';
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
export class OtpCheckerComponent implements OnInit {
  account: Account = new Account()

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {
    this.account = this.authService.accountStorage
  }

  ngOnInit(): void {
  }

  onOtpChange($event: string) {
    if ($event.length === 6) {
      this.authService.verifyOtp(this.account.email, $event).pipe(first()).subscribe(
        rs => {
          this.authService.register(this.account)
            .pipe(first())
            .subscribe({
                next: () => {
                  this.authService.login(this.account.email, this.account.password)
                    .pipe(first())
                    .subscribe(() => {
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
        }
      )
    }
  }
}
