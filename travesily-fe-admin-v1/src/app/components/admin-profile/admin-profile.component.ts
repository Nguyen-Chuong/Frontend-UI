import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Account } from 'src/app/_models/account';
import { FileUpload } from 'src/app/_models/file-upload';
import { AuthServiceService } from 'src/app/_services/auth-service.service';
import { FirebaseService } from 'src/app/_services/firebase.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  account: Account = new Account;
  formGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]),
    address: new FormControl('', [Validators.required])
  })
  isPhone = false
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  constructor(private authService: AuthServiceService,
    private notificationService: NotificationService,
    private firebaseService: FirebaseService) {
    authService.getProfile().pipe(first()).subscribe(account => {
      this.account = account['data']
      this.formGroup = new FormGroup({
        firstname: new FormControl(this.account.firstname),
        lastname: new FormControl(this.account.lastname),
        phone: new FormControl(this.account.phone, [Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]),
        address: new FormControl(this.account.address)
      })
    })
  }

  ngOnInit(): void {
  }

  updateProfile() {
    const val = this.formGroup.value
    this.account.firstname = val.firstname
    this.account.lastname = val.lastname
    this.account.phone = val.phone
    this.account.address = val.address
    this.authService.update(this.account).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Update profile successfully');
      },
      error: () => {
        this.notificationService.onError('Update profile false')
      }
    })
  }

  checkPhone() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      this.isPhone = true
    } else
      this.isPhone = false
  }

  upload(): void {
    if (this.selectedFiles) {
      const file = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      this.currentFileUpload = new FileUpload(file);
      this.firebaseService.pushFileToStorage(this.currentFileUpload, 'accounts', this.account.id)
      this.firebaseService.getStorageUrl().subscribe(
        rs => {
          this.account.avatar = rs
          this.authService.update(this.account).pipe(first()).subscribe({
            next: () => {
              setTimeout(() => {
                this.notificationService.onSuccess('Update profile successfully');
                window.location.reload()
              }, 3000)
            },
            error: err => {
              console.log(err)
              this.notificationService.onError('Update profile false')
            }
          })
        }
      )
    }
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
    const [file] = event.target.files
    if (file) {
      document.getElementById('preview-image')['src'] = URL.createObjectURL(file)
    }
  }

  getErrorMessage(field: string) {
    if (field === 'firstname' && this.formGroup.controls['firstname'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'lastname' && this.formGroup.controls['lastname'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'address' && this.formGroup.controls['address'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'phone' && this.formGroup.controls['phone'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.formGroup.controls['phone'].hasError('pattern') ? 'Phone is not correct format' : '';
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }
}
