import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthServiceService } from 'src/app/_services/auth-service.service';
import { Account } from 'src/app/_models/account';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  account: Account = new Account;
  formGroup!: FormGroup;
  isPhone = false
  constructor(private authService: AuthServiceService,
    private router: Router,
    private notificationService: NotificationService) {
    authService.getProfile().pipe(first()).subscribe(account => {
      this.account = account['data']
    })
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.minLength(10), Validators.maxLength(11)]),
      address: new FormControl('', [Validators.required])
    })
  }

  updateProfile() {
    const val = this.formGroup.value
    if (val.firstname) {
      this.account.firstname = val.firstname
    }
    if (val.lastname) {
      this.account.lastname = val.lastname
    }
    if (val.phone) {
      this.account.phone = val.phone
    }

    if (val.address) {
      this.account.address = val.address
    }
    this.authService.update(this.account).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Update profile successfully');
      },
      error: err => {
        this.notificationService.onError('Update profile false')
      }
    })

  }

}
