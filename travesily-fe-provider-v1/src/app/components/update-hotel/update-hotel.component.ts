import { PostRequest } from './../../_models/postRequest';
import { RequestService } from 'src/app/_services/request.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
        name: [this.hotel.name],
        email: [this.hotel.email, [Validators.email]],
        phone: [this.hotel.phone, [Validators.minLength(10), Validators.maxLength(11)]],
        address: [this.hotel.address],
        description: [this.hotel.description],
      })
      this.encryptedHotelId = this.cryptoService.set('06052000', this.hotel.id)
      this.cityControl = new FormControl(this.city, Validators.required);
      this.districtControl = new FormControl(this.hotel.district, Validators.required);
    })
    this.citiesService.getAllCities().pipe(first()).subscribe(res => {
      this.cities = res['data']
    })

  }

  submit() {

    const val = this.form.value
    const hotelRequest = new HotelRequest

    hotelRequest.id = this.hotel.id
    hotelRequest.name = val.name
    hotelRequest.email = val.email
    hotelRequest.phone = val.phone
    hotelRequest.address = val.address
    hotelRequest.description = val.description
    this.district.id = this.districtControl.value.id
    this.district.nameDistrict = this.districtControl.value.nameDistrict
    if (this.districtControl.value.id) {
      hotelRequest.districtId = this.district.id
    }
    console.log(this.imageUrl)
    if (this.selectedFiles) {
      hotelRequest.avatar = this.imageUrl
    }
    this.hotelService.updateHotel(hotelRequest).pipe(first()).subscribe({
      next: () => {
        console.log(this.hotel)
        this.notificationService.onSuccess('Update Hotel successfully');
        //window.location.reload()
      },
      error: err => {
        console.log(err)
        this.notificationService.onError('Update Hotel false')
      }
    })

  }

  changeCityID(city: City) {
    this.district.city = city
    const encryptedId = this.cryptoService.set('06052000', city.id)
    this.citiesService.getDistrictInCity(encryptedId).pipe(first()).subscribe(res => {
      this.districts = res['data']
    })
  }

  addRequestHotel() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { checked: this.checked, message: "Are you sure wanna add this hotel to request list" },
    });

    const postRequest: PostRequest = new PostRequest
    postRequest.hotelId = this.hotel.id
    console.log(postRequest)
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
      data: { checked: this.checked, message: "Are you sure wanna Disable this hotel" },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.checked = result['checked']
      if (this.checked) {
        this.hotelService.disableHotel(this.encryptedHotelId).pipe(first()).subscribe({
          next: () => {
            this.notificationService.onSuccess('Disable successfully');
            window.location.reload()
          },
          error: err => {
            this.notificationService.onError('Disable false')
          }
        })
      }
    });
  }

  enableHotel() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { checked: this.checked, message: "Are you sure wanna Enable this hotel" },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.checked = result['checked']
      if (this.checked) {
        this.hotelService.enableHotel(this.encryptedHotelId).pipe(first()).subscribe({
          next: () => {
            this.notificationService.onSuccess('Enable successfully');
            window.location.reload()
          },
          error: err => {
            this.notificationService.onError('Enable false')
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

}
