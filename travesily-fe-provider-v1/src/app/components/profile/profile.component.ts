import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
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

  form: FormGroup = this.fb.group({
    providerName: [''],
    address: [''],
    phone: ['', [Validators.minLength(10), Validators.maxLength(11)]]
  })
  account: Account = new Account

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit(): void {
    this.authService.getProfile().pipe(first()).subscribe(account => {
      this.account = account['data']
      this.form = this.fb.group({
        providerName: [this.account.providerName],
        address: [this.account.address],
        phone: [this.account.phone, [Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]]
      })
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
    this.authService.update(this.account).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Update profile successfully');
      },
      error: err => {
        console.log(err)
        this.notificationService.onError('Update profile fail')
      }
    })
  }
  
  getErrorMessage(field: string) {
    if (field === 'providerName' && this.form.controls['providerName'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'address' && this.form.controls['address'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'phone' && this.form.controls['phone'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.controls['phone'].hasError('pattern') ? 'Phone is not correct format' : '';
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }
}
