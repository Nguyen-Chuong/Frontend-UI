import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../../_services/auth.service';
import {AlertService} from '../../../../../_services/alert.service';
import {StorageService} from '../../../../../_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private storage: StorageService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.value;
  }

  onSubmit() {
    const val = this.form.value;
    if (val.email && val.password) {
      this.authService.login(val.email, val.password).subscribe({
        next: () => {
          if (this.storage.accountType === 0) {
            this.form.reset();
            this.activatedRoute.queryParams.subscribe({
              next: (value) => {
                this.router
                  .navigateByUrl(value['url'] ? value['url'] : '/')
                  .then(() => window.location.reload());
              },
            });
          } else if (
            this.storage.accountType === 1 ||
            this.storage.accountType === 2
          ) {
            this.form.reset();
            window.location.href =
              'https://admin.travesily.software/home';
              //'http://localhost:4300/home';
          }
        },
        error: () => {
          this.form.reset();
          this.alertService.error('Please check your email and password!');
        },
      });
    }
  }

  getErrorMessage(field: string) {
    if (field === 'email' && this.form.controls['email'].hasError('required')) {
      return 'You must enter a value';
    } else if (field === 'password' &&this.form.controls['password'].hasError('required')) {
      return 'You must enter a value';
    } else if (field === 'password' &&this.form.controls['password'].hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    return this.form.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }
}
