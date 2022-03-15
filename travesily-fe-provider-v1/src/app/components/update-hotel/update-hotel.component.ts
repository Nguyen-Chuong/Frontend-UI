import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { City } from 'src/app/_models/city';
import { District } from 'src/app/_models/district';
import { Hotel } from 'src/app/_models/hotel';
import { CryptoService } from 'src/app/_services/crypto.service';
import { HotelService } from 'src/app/_services/hotel.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { CitiesService } from './../../_services/cities.service';

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
  checked: boolean
  encryptedHotelId: string

  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private citiesService: CitiesService,
    private cryptoService: CryptoService,
    public dialog: MatDialog,
    private notificationService: NotificationService) {
    this.form = fb.group({
      name: [''],
      email: ['', [Validators.email]],
      phone: ['', [Validators.minLength(10), Validators.maxLength(11)]],
      address: [''],
      description: [''],
    })

    this.cityControl = new FormControl(this.city, Validators.required);
    this.districtControl = new FormControl('', Validators.required);
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

      this.encryptedHotelId = this.cryptoService.set('06052000', this.hotel.id)
    })
    this.citiesService.getAllCities().pipe(first()).subscribe(res => {
      this.cities = res['data']
    })
  }

  submit() {
    const val = this.form.value
    if (val.name) {
      this.hotel.name = val.name
    }
    if (val.email) {
      this.hotel.email = val.email
    }
    if (val.phone) {
      this.hotel.phone = val.phone
    }
    if (val.address) {
      this.hotel.address = val.address
    }
    console.log(val.description)
    if (val.description) {
      this.hotel.description = val.description
    }
    this.district.id = this.districtControl.value.id
    this.district.nameDistrict = this.districtControl.value.nameDistrict
    console.log(this.districtControl.value)
    if (this.districtControl.value.id) {
      this.hotel.district = this.district
    }


    this.hotelService.updateHotel(this.hotel).pipe(first()).subscribe({
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

  disableHotel(){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {checked: this.checked, message: "Are you sure wanna Disable this hotel"},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.checked = result['checked']
      if(this.checked){
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

  enableHotel(){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {checked: this.checked, message: "Are you sure wanna Enable this hotel"},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.checked = result['checked']
      if(this.checked){
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

}
