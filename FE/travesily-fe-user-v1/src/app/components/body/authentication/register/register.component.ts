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
import {AuthService} from "../../../../_services/auth.service";
import {Account} from "../../../../_models/account";
import {concatMap, first} from "rxjs";
import {AlertService} from "../../../../_services/alert.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.form = fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      // confirmPassword: ['', [Validators.required,this.checkPassword(this.form.value)]],
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

    this.authService.register(account)
      .pipe(first())
      .subscribe({
          next: () => {
            this.alertService.success('Register Successful')
          }, error: error => {
            this.alertService.error('Register Failed')
          this.form.reset()
          }
        }
      )
  }

  checkPassword: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password').value
    let confirmPass = group.get('confirmPassword').value
    console.log(`${pass} and ${confirmPass}`)
    return pass === confirmPass ? null : {notMatch: true}
  }
}
