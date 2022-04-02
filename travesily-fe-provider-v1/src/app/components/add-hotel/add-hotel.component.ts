import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { City } from 'src/app/_models/city';
import { District } from 'src/app/_models/district';
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

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private cryptoService: CryptoService,
    private citiesService: CitiesService
  ) {
    this.form = fb.group({
      hotelName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], [EmailValidator(this.authService)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      address: ['', [Validators.required]],
      descriptionTitle: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })

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
    hotel.description = "<strong> "+val.descriptionTitle +"</strong> <br/>" + val.description
    hotel.districtId = this.districtControl.value.id
    this.hotelService.newHotel(hotel)
      .pipe(first())
      .subscribe({
        next: (res) => {
          localStorage.setItem('hotel-id', res['data'])
          this.notificationService.onSuccess("Add Hotel Successfully")
        }, error: error => {
          this.notificationService.onError("Add Hotel False")

        }
      })
  }



  changeCityID(city: City) {
    const encryptedId = this.cryptoService.set('06052000', city.id)
    this.citiesService.getDistrictInCity(encryptedId).pipe(first()).subscribe(res => {
      this.districts = res['data']
    })
  }


}
