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
import {Router} from "@angular/router";
import {AuthService} from "../../../../../_services/auth.service";
import {Account} from "../../../../../_models/account";
import {concatMap, first} from "rxjs";
import {AlertService} from "../../../../../_services/alert.service";
import {UsernameValidator} from "../../../../../_validators/username.validator";
import {EmailValidator} from "../../../../../_validators/email.validator";

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
    private alertService: AlertService
  ) {
    this.form = fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required], [UsernameValidator(this.authService)]],
      email: ['', [Validators.required, Validators.email], [EmailValidator(this.authService)]],
      password: ['', [Validators.required, this.matchValidator('confirmPassword', true)]],
      confirmPassword: ['', [Validators.required, this.matchValidator('password')]],
    })
  }

  ngOnInit(): void {
  }

  submit() {
    const val = this.form.value
    const account = new Account()
    account.firstname = val.firstname
    account.lastname = val.lastname
    account.email = val.email
    account.password = val.password
    account.username = val.username

    this.authService.register(account)
      .pipe(first())
      .subscribe({
          next: () => {
            this.authService.login(account.email, account.password)
              .pipe(first())
              .subscribe(() =>{
                this.router.navigateByUrl('/user/profile').then(() => {
                  this.alertService.success('Register Successful')
                  window.location.reload()
                })
              })

          }, error: error => {
            this.alertService.error('Register Failed')
            this.form.reset()
          }
        }
      )
  }

  // checkPassword: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  //   let pass = group.get('password').value
  //   let confirmPass = group.get('confirmPassword').value
  //   console.log(`${pass} and ${confirmPass}`)
  //   return pass === confirmPass ? null : {notMatch: true}
  // }

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

}
