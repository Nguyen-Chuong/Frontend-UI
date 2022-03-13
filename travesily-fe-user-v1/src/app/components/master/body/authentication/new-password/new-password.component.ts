import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../../../../_services/auth.service";
import {AlertService} from "../../../../../_services/alert.service";
import {first} from "rxjs";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  email: string
  form: FormGroup

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private alertService: AlertService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      newPass: ['', [Validators.required, this.matchValidator('confirmNewPass', true)]],
      confirmNewPass: ['', [Validators.required, this.matchValidator('newPass')]]
    })
    this.activatedRoute.queryParams.subscribe(rs => {
      this.email = rs['email']
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
        : {matching: true};
    }
  }

  onSave() {
    if (this.form.value.newPass && this.form.value.confirmNewPass) {
      this.authService.resetPassword(this.email, this.form.value.newPass).pipe(first()).subscribe(
        rs => {
          this.authService.clearEmailStorage()
          this.router.navigateByUrl('/authentication/login').then(() => {
            this.alertService.success('Change password successfully')
          })

        },
        error => {
          this.alertService.error(error)
        }
      )
    }
  }
}
