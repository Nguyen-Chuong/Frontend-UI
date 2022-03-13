import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../../_services/auth.service";
import {first} from "rxjs";
import {AlertService} from "../../../../../_services/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.value;
  }

  onSubmit() {
    const val = this.form.value
    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .pipe(first())
        .subscribe({
          next: () => {
            if (this.authService.accountType === 0) {
              this.form.reset()
              this.router.navigateByUrl('/home').then(() => window.location.reload());
            } else if (this.authService.accountType === 1 || this.authService.accountType === 2) {
              this.form.reset()
              window.location.href = 'http://localhost:4300/taskbar'
            }
          }, error: error => {
            this.form.reset()
            this.alertService.error('Login Failed')
          }
        })
    }
  }
}
