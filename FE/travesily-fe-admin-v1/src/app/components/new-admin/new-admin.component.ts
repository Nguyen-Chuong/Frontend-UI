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
      email: ['', [Validators.required, Validators.email], [EmailValidator(this.authService)]],
      password: ['', [Validators.required, this.matchValidator('confirmPassword', true)]],
      confirmPassword: ['', [Validators.required, this.matchValidator('password')]],
    })
  }

  ngOnInit(): void {
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
        console.log(err)
      }
    })
  }
}
