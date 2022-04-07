import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.authService.logout()
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
              this.form.reset()
              this.notificationService.onSuccess("Login Successfully")
              this.router.navigateByUrl('/hotel-list').then(() => window.location.reload());
          }, error: error => {
            this.notificationService.onError("Login False")
            this.form.reset()
          }
        })
    }
  }

}
