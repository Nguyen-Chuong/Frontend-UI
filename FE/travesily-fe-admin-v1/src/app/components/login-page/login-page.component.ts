import { NotificationService } from './../../_services/notification.service';
import { Router } from '@angular/router';
import { AuthServiceService } from './../../auth-service.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit {

  formGroup!: FormGroup;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private notificationService: NotificationService
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
            this.notificationService.onError('Email or Password incorrect')
          }
        })
    }
  }

}
