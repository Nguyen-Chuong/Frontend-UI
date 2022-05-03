import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs';
import {City} from 'src/app/_models/city';
import {District} from 'src/app/_models/district';
import {Hotel} from 'src/app/_models/hotel';
import {AuthService} from 'src/app/_services/auth.service';
import {CitiesService} from 'src/app/_services/cities.service';
import {CryptoService} from 'src/app/_services/crypto.service';
import {HotelService} from 'src/app/_services/hotel.service';
import {NotificationService} from 'src/app/_services/notification.service';
import {EmailValidator} from 'src/app/_validators/email.validator';
import {HotelRequest} from './../../_models/hotelRequest';

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
  hotel: Hotel = new Hotel()

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private cryptoService: CryptoService,
    private citiesService: CitiesService
  ) {
    this.cityControl = new FormControl('', Validators.required);
    this.districtControl = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      hotelName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], [EmailValidator(this.authService)]],
      phone: ['', [Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]],
      address: ['', [Validators.required]],
      descriptionTitle: ['', [Validators.required]],
      star: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      description: ['', [Validators.required]],
    })
    if (localStorage.getItem('hotel-id')) {
      const hotelId = this.cryptoService.set('06052000', Number(localStorage.getItem('hotel-id')))
      this.hotelService.getHotelById(hotelId).pipe(first()).subscribe(res => {
        this.hotel = res['data']
        this.form.setValue({
          hotelName: this.hotel.name,
          email: this.hotel.email,
          phone: this.hotel.phone,
          address: this.hotel.address,
          descriptionTitle: '',
          star: this.hotel.star,
          description: this.hotel.description,
        })
        this.cityControl.setValue(this.hotel.district.city)
        this.changeCityID(this.cityControl.value)
        this.districtControl.setValue(this.hotel.district)
      })
    }
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
    hotel.star = val.star
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
    if (field === 'star' && this.form.controls['star'].hasError('required')) {
      return 'You must enter a value';
    }
    if (field === 'star' && this.form.controls['star'].hasError('min')) {
      return 'Min star is 1';
    }
    if (field === 'star' && this.form.controls['star'].hasError('max')) {
      return 'Max star is 5';
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

  clear() {
    this.form.reset()
  }

  compareCity(city1: City, city2: City): boolean {
    return city1 && city2 ? city1.id === city2.id : city1 === city2
  }

  compareDistrict(district1: District, district2: District): boolean {
    return district1 && district2 ? district1.id === district2.id : district1 === district2
  }


}
