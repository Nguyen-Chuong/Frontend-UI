import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Account } from 'src/app/_models/account';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup
  account: Account = new Account

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.form = fb.group({
      providerName: [''],
      address: [''],
      phone: ['', [Validators.minLength(10), Validators.maxLength(11)]]
    })
  }

  ngOnInit(): void {
    this.authService.getProfile().pipe(first()).subscribe(account => {
      this.account = account['data']
    })
  }

  submit() {
    const val = this.form.value
    if (val.providerName) {
      this.account.providerName = val.providerName
    }
    if (val.phone) {
      this.account.phone = val.phone
    }
    if (val.address) {
      this.account.address = val.address
    }
    console.log(this.account)
    this.authService.update(this.account).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Update profile successfully');
      },
      error: err => {
        console.log(err)
        this.notificationService.onError('Update profile false')
      }
    })

  }

}
