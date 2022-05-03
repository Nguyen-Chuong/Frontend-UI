import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { City } from 'src/app/_models/city';
import { District } from 'src/app/_models/district';
import { Hotel } from 'src/app/_models/hotel';
import { AuthService } from 'src/app/_services/auth.service';
import { CitiesService } from 'src/app/_services/cities.service';
import { CryptoService } from 'src/app/_services/crypto.service';
import { HotelService } from 'src/app/_services/hotel.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { EmailValidator } from 'src/app/_validators/email.validator';
import { HotelRequest } from './../../_models/hotelRequest';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.scss']
})
export class AddHotelComponent implements OnInit {
  form: FormGroup
  cityControl: FormControl
  districtControl: FormControl
  cities: City[]
  districts: District[]
  city: City
  hotel: Hotel = new Hotel()
  constructor(
    fb: FormBuilder,
    private hotelService: HotelService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private cryptoService: CryptoService,
    private citiesService: CitiesService
  ) {
    if (localStorage.getItem('hotel-id')) {
      const hotelId = this.cryptoService.set('06052000', Number(localStorage.getItem('hotel-id')))
      this.hotelService.getHotelById(hotelId).pipe(first()).subscribe(res => {
        this.hotel = res['data']
        this.form = fb.group({
          hotelName: [this.hotel.name, [Validators.required]],
          email: [this.hotel.email, [Validators.required, Validators.email], [EmailValidator(this.authService)]],
          phone: [this.hotel.phone, [Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]],
          address: [this.hotel.address, [Validators.required]],
          descriptionTitle: ['', [Validators.required]],
          description: [this.hotel.description, [Validators.required]],
        })
      })
    } else {
      this.form = fb.group({
        hotelName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email], [EmailValidator(this.authService)]],
        phone: ['', [Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]],
        address: ['', [Validators.required]],
        descriptionTitle: ['', [Validators.required]],
        description: ['', [Validators.required]],
      })
    }
    this.cityControl = new FormControl(this.city, Validators.required);
    this.districtControl = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    this.citiesService.getAllCities().pipe(first()).subscribe(res => {
      this.cities = res['data']
    })
  }

  submit() {
    const val = this.form.value
    const hotel = new HotelRequest
    hotel.name = val.hotelName
    hotel.address = val.address
    hotel.email = val.email
    hotel.phone = val.phone
    hotel.description = "<strong> " + val.descriptionTitle + "</strong> <br/>" + val.description
    hotel.districtId = this.districtControl.value.id
    this.hotelService.newHotel(hotel)
      .pipe(first())
      .subscribe({
        next: (res) => {
          localStorage.setItem('hotel-id', res['data'])
          this.notificationService.onSuccess("Add Hotel Successfully")
        }, error: () => {
          this.notificationService.onError("Add Hotel Fail")
        }
      })
  }

  changeCityID(city: City) {
    const encryptedId = this.cryptoService.set('06052000', city.id)
    this.citiesService.getDistrictInCity(encryptedId).pipe(first()).subscribe(res => {
      this.districts = res['data']
    })
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

  clear(){
    this.form.reset()
  }
}
