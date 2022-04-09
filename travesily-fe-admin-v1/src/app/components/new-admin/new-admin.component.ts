import { Account } from 'src/app/_models/account';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/_services/auth-service.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { first } from 'rxjs';
import { ParentErrorStateMatcher, PasswordValidator } from 'src/app/_validators/password.validator';
import { Router } from '@angular/router';
import { UsernameValidator } from 'src/app/_validators/username.validator';
import { EmailValidator } from 'src/app/_validators/email.validator';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.scss']
})
export class NewAdminComponent implements OnInit {
  isAdmin = false

  isManager = false

  manager = new Account

  matchingPasswordsGroup: FormGroup;

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  form: FormGroup

  constructor(private fb: FormBuilder,
    private authService: AuthServiceService,
    private notificationService: NotificationService,
    private router: Router,
  ) {
    this.form = fb.group({
      username: ['', [Validators.required], [UsernameValidator(this.authService)]],
      email: ['', [Validators.required, Validators.email], [EmailValidator(this.authService)] ],
      password: ['', [Validators.required, this.matchValidator('confirmPassword', true), Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required, this.matchValidator('password')]],
    })
  }

  ngOnInit(): void {
    if(localStorage.getItem('type')  === '2'){
      this.isAdmin = true
    }else{
      this.isManager = true
    }
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
        : { matching: true };
    }
  }

  addAdmin() {
    const val =this.form.value
    this.manager.email = val.email
    this.manager.username = val.username
    this.manager.password = val.password
    this.authService.addManager(this.manager).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Add new manager successfully');
        this.form.reset()
        window.location.reload()
      },
      error: err => {
        this.notificationService.onError('Add new manager false')
      }
    })
  }


  getErrorMessage(field: string) {
    if (field === 'username' && this.form.controls['username'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'email' && this.form.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'password' && this.form.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'confirmPassword' && this.form.controls['confirmPassword'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'username' && this.form.controls['username'].hasError('duplicateUsername')) {
      return 'Username existed! Please choose another username!';
    }
    if (field === 'email' && this.form.controls['email'].hasError('duplicateEmail')) {
      return 'This email has been registered!';
    }
    if (field === 'password' && this.form.controls['password'].hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    if (field === 'password' && this.form.controls['password'].hasError('pattern')) {
      return 'Password must contains at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!';
    }
    if (field === 'password' && this.form.controls['password'].hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    if (field === 'password' && this.form.controls['password'].hasError('pattern')) {
      return 'Password must contains at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!';
    }
    if (field === 'confirmPassword' && this.form.controls['confirmPassword'].hasError('matching')) {
      return 'Confirm password not match! Please re-check!';
    }

    return this.form.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }
}
