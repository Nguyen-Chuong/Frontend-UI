import { Account } from 'src/app/_models/account';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/_services/auth-service.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { first } from 'rxjs';
import { ParentErrorStateMatcher, PasswordValidator } from 'src/app/_validators/password.validator';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.scss']
})
export class NewAdminComponent implements OnInit {

  managerProfile: FormGroup;

  manager = new Account

  matchingPasswordsGroup: FormGroup;

  parentErrorStateMatcher = new ParentErrorStateMatcher();
  account_validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'terms': [
      { type: 'pattern', message: 'make sure you create a manager?' }
    ]
  }
  constructor(private fb: FormBuilder,
    private authService: AuthServiceService,
    private notificationService: NotificationService) { }


  ngOnInit() {
    this.createForms();
  }

  createForms() {
    // matching passwords validation
    this.matchingPasswordsGroup = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    // user links form validations
    this.managerProfile = this.fb.group({
      username: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matchingPasswords: this.matchingPasswordsGroup,
      terms: new FormControl(false, Validators.pattern('true'))
    })

  }

  addAdmin(value) {
    this.manager.email = value.email
    this.manager.username = value.username
    this.manager.password = value.matchingPasswords.password
    console.log(value.email)
    console.log(value.matchingPasswords.password)
    this.authService.addManager(this.manager).pipe(first()).subscribe({

      next: () => {

        this.notificationService.onSuccess('Add new manager successfully');
        this.managerProfile.reset()
        window.location.reload()
      },
      error: err => {
        this.notificationService.onError('Add new manager false')
        console.log(err)
      }
    })
  }
}
