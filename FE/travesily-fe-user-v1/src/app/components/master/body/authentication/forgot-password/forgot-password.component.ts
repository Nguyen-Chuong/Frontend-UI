import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../../_services/auth.service";
import {Router} from "@angular/router";
import {first} from "rxjs";
import {AlertService} from "../../../../../_services/alert.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private alertService: AlertService) {
    this.form = this.fb.group({
      email: ['',[Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {

  }

  click() {
    this.authService.checkEmailDuplicated(this.form.value.email).pipe(first()).subscribe(
      rs => {
        if(rs['data'] === true){
          this.authService.emailStorage = this.form.value.email
          this.router.navigateByUrl('authentication/otp-checker')
        }
        else {
          this.alertService.error('There is no account registered with this email')
          this.form.reset()
        }
      },
      error => {
        this.alertService.error(error)
      }
    )

  }
}
