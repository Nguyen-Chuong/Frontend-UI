import { RoomService } from './../../_services/room.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Hotel } from 'src/app/_models/hotel';
import { AuthService } from 'src/app/_services/auth.service';
import { HotelService } from 'src/app/_services/hotel.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { Room } from 'src/app/_models/room';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {

  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private hotelService: HotelService,
    private authService: AuthService,
    private roomService: RoomService,
    private notificationService: NotificationService
  ) {
    this.form = fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      availableRoom: ['', [Validators.required]],
      numberOfPeople: ['', [Validators.required]],
      price: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  submit() {
    const val = this.form.value
    const room = new Room
    room.name = val.name
    room.quantity = val.quantity
    room.availableRooms = val.availableRoom
    room.numberOfPeople = val.numberOfPeople
    room.price = val.price
    room.hotelId = Number(localStorage.getItem('hotel-id'))

    this.roomService.newRoom(room)
      .pipe(first())
      .subscribe({
        next: (res) => {
          localStorage.setItem('room-id', res['data'])
          this.notificationService.onSuccess("Add room Successfully")
        }, error: error => {
          this.notificationService.onError("Add room False")
        }
      })

  }

}
