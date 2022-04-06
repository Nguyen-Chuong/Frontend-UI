import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Account } from 'src/app/_models/account';
import { AuthServiceService } from 'src/app/_services/auth-service.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  account: Account = new Account;
  formGroup!: FormGroup;
  passNotMatch= false
  constructor(private authService: AuthServiceService,
    private router: Router,
    private notificationService: NotificationService) {
    authService.getProfile().pipe(first()).subscribe(account => {
      this.account = account['data']
    })
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmNewPassword: new FormControl('', [Validators.required]),
    })
  }

  changePassword() {
    const val = this.formGroup.value
      if (val.newPassword === val.confirmNewPassword) {
        this.authService.changePassword(val.password, val.newPassword).pipe(first()).subscribe({
          next: () => {
            this.notificationService.onSuccess('Change Password successfully');
            window.location.reload()
          }, error: err => {
            console.log(err)
            this.notificationService.onError('Change Password false')
          }
        })
      }else{
        this.passNotMatch = !this.passNotMatch
      }

  }
}
