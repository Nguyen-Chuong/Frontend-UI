import { Account } from 'src/app/_models/account';
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/_services/auth-service.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { UsernameValidator } from 'src/app/_validators/username.validator';
import { EmailValidator } from 'src/app/_validators/email.validator';
import { first } from 'rxjs';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.scss']
})
export class NewAdminComponent implements OnInit {

  formGroup!: FormGroup;
  manager = new Account
  constructor(private authService: AuthServiceService,
    private router: Router,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
      email: new FormControl('', [Validators.required, Validators.email, EmailValidator(this.authService)]),
      username: new FormControl('', [Validators.required, UsernameValidator(this.authService)]),
      password: new FormControl('', [Validators.required]),
      cfPassword: new FormControl('', [Validators.required]),
    })

}

addAdmin(){
  console.log('new manager')
  const val = this.formGroup.value
  this.manager.email = val.email
  this.manager.username = val.username
  this.manager.phone = val.phone
  this.manager.password = val.password
  console.log('new manager2')
  this.authService.addManager(this.manager).pipe(first()).subscribe({

    next: () => {
      console.log('new manager3')
      this.notificationService.onSuccess('Add new manager successfully');
    },
    error: err => {
      console.log('new manager5')
      this.notificationService.onError('Add new manager false')
    }
  })
}
}
