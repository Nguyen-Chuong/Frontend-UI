import { Router } from '@angular/router';
import { AuthServiceService } from './../../auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AlertService } from 'src/app/_services/_services/alert.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  formGroup!: FormGroup;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  loginProcess() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).pipe(first())
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/taskbar');
          }, error: error => {
            this.formGroup.reset()
            this.alertService.error('Login Failed')
          }
        })
    }
  }

}
