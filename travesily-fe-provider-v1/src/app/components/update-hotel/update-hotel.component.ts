import { PostRequest } from './../../_models/postRequest';
import { RequestService } from 'src/app/_services/request.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { City } from 'src/app/_models/city';
import { District } from 'src/app/_models/district';
import { CryptoService } from 'src/app/_services/crypto.service';
import { HotelService } from 'src/app/_services/hotel.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { CitiesService } from './../../_services/cities.service';
import { HotelRequest } from 'src/app/_models/hotelRequest';
import { Hotel } from 'src/app/_models/hotel';
import { FileUpload } from 'src/app/_models/file-upload';
import { FirebaseService } from 'src/app/_services/firebase.service';
import { EmailValidator } from 'src/app/_validators/email.validator';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-update-hotel',
  templateUrl: './update-hotel.component.html',
  styleUrls: ['./update-hotel.component.scss']
})
export class UpdateHotelComponent implements OnInit {
  cityControl: FormControl
  districtControl: FormControl
  form: FormGroup
  hotel: Hotel = new Hotel
  district: District = new District
  hotelId: any
  cities: City[]
  districts: District[]
  city: City
  isEnable = true
  isDisable = true
  isPending = true
  checked: boolean
  encryptedHotelId: string
  selectedFiles: FileList
  currentFileUpload: FileUpload
  imageUrl: string

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private citiesService: CitiesService,
    private cryptoService: CryptoService,
    public dialog: MatDialog,
    private firebaseService: FirebaseService,
    private requestService: RequestService,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.hotelId = param['id'].slice(1, -1);
    })
    this.hotelService.getHotelById(this.hotelId).pipe(first()).subscribe(res => {
      this.hotel = res['data']
      this.district = this.hotel.district
      this.city = this.hotel.district.city
      if (this.hotel.status === 1) {
        this.isDisable = false
      }
      if (this.hotel.status === 2) {
        this.isEnable = false
      }
      if (this.hotel.status === 3) {
        this.isPending = false
      }
      this.form = this.fb.group({
        hotelName: [this.hotel.name],
        email: [this.hotel.email, [Validators.required, Validators.email], [EmailValidator(this.authService)]],
        phone: [this.hotel.phone, [Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]],
        address: [this.hotel.address],
        description: [this.hotel.description],
      })
      this.encryptedHotelId = this.cryptoService.set('06052000', this.hotel.id)
      this.cityControl = new FormControl(this.city, Validators.required);
      const encryptedId = this.cryptoService.set('06052000', this.city.id)
      this.citiesService.getDistrictInCity(encryptedId).pipe(first()).subscribe(res => {
        this.districts = res['data']
      })
      this.districtControl = new FormControl(this.district, Validators.required);
    })
    this.citiesService.getAllCities().pipe(first()).subscribe(res => {
      this.cities = res['data']
    })

  }

  submit() {
    const val = this.form.value
    const hotelRequest = new HotelRequest
    hotelRequest.id = this.hotel.id
    hotelRequest.name = val.hotelName
    hotelRequest.email = val.email
    hotelRequest.phone = val.phone
    hotelRequest.address = val.address
    hotelRequest.description = val.description
    if (this.districtControl.value.id) {
      hotelRequest.districtId = this.districtControl.value.id
    }
    if (this.selectedFiles) {
      hotelRequest.avatar = this.imageUrl
    }
    this.hotelService.updateHotel(hotelRequest).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Update Hotel successfully');
      },
      error: err => {
        console.log(err)
        this.notificationService.onError('Update Hotel fail')
      }
    })
  }

  changeCityID(event) {
    this.city.id = event.target['value']
    console.log(event.target['value'])
    const encryptedId = this.cryptoService.set('06052000', this.city.id)
    this.citiesService.getDistrictInCity(encryptedId).pipe(first()).subscribe(res => {
      this.districts = res['data']
      console.log(this.districts)
    })
  }

  addRequestHotel() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { checked: this.checked, message: "Are you sure you want to add this hotel to request list" },
    });
    const postRequest: PostRequest = new PostRequest
    postRequest.hotelId = this.hotel.id
    dialogRef.afterClosed().subscribe(result => {
      this.checked = result['checked']
      if (this.checked) {
        this.requestService.addRequest(postRequest).pipe(first()).subscribe({
          next: () => {
            this.notificationService.onSuccess('Add successfully');
            window.location.reload()
          },
          error: err => {
            console.log(err)
            this.notificationService.onError(err['error']['error_message'])
          }
        })
      }
    });
  }

  disableHotel() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { checked: this.checked, message: "Are you sure you want to Disable this hotel" },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.checked = result['checked']
      if (this.checked) {
        this.hotelService.disableHotel(this.encryptedHotelId).pipe(first()).subscribe({
          next: () => {
            this.notificationService.onSuccess('Disable successfully');
            window.location.reload()
          },
          error: () => {
            this.notificationService.onError('Disable fail')
          }
        })
      }
    });
  }

  enableHotel() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { checked: this.checked, message: "Are you sure you want to Enable this hotel" },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.checked = result['checked']
      if (this.checked) {
        this.hotelService.enableHotel(this.encryptedHotelId).pipe(first()).subscribe({
          next: () => {
            this.notificationService.onSuccess('Enable successfully');
            window.location.reload()
          },
          error: () => {
            this.notificationService.onError('Enable fail')
          }
        })
      }
    });
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
    this.upload()
  }

  upload(): void {
    if (this.selectedFiles) {
      const file = this.selectedFiles.item(0);
      this.currentFileUpload = new FileUpload(file);
      this.firebaseService.pushFileToStorage(this.currentFileUpload, 'hotel', this.encryptedHotelId, this.encryptedHotelId)
      this.firebaseService.getStorageUrl().subscribe(
        rs => {
          this.imageUrl = rs
        }
      )
    }
  }

  getErrorMessage(field: string) {
    if (field === 'hotelName' && this.form.controls['hotelName'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'email' && this.form.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'address' && this.form.controls['address'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'phone' && this.form.controls['phone'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'description' && this.form.controls['description'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'descriptionTitle' && this.form.controls['descriptionTitle'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'phone' && this.form.controls['phone'].hasError('pattern')) {
      return 'Your phone number is not correct format! Please re-check!';
    }
    return this.form.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }
}
