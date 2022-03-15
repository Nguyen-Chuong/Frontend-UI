import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Hotel } from 'src/app/_models/hotel';
import { AuthService } from 'src/app/_services/auth.service';
import { HotelService } from 'src/app/_services/hotel.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { EmailValidator } from 'src/app/_validators/email.validator';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.scss']
})
export class AddHotelComponent implements OnInit {

  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private hotelService: HotelService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.form = fb.group({
      hotelName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], [EmailValidator(this.authService)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      address: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  submit() {
    const val = this.form.value
    const hotel = new Hotel
    hotel.name = val.hotelName
    hotel.address = val.address
    hotel.email = val.email
    hotel.phone = val.phone
    hotel.description = val.description
    hotel.district.id = 1
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

}
