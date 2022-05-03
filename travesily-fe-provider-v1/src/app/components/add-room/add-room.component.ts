import { RoomService } from './../../_services/room.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { NotificationService } from 'src/app/_services/notification.service';
import { Room } from 'src/app/_models/room';
import { CryptoService } from 'src/app/_services/crypto.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {
  form: FormGroup
  isHotel = false
  room: Room = new Room()
  constructor(
    fb: FormBuilder,
    private roomService: RoomService,
    private notificationService: NotificationService,
    private cryptoService: CryptoService
  ) {
    if(localStorage.getItem('room-id')){
      const encryptedRoomId = this.cryptoService.set('06052000', Number(localStorage.getItem('room-id')))
      this.roomService.getRoomDetail(encryptedRoomId).pipe(first()).subscribe(res => {
        this.room = res['data']
        this.form = fb.group({
          name: [this.room.name, [Validators.required]],
          quantity: [this.room.quantity, [Validators.required]],
          availableRoom: [this.room.availableRooms, [Validators.required]],
          numberOfPeople: [this.room.numberOfPeople, [Validators.required]],
          price: [this.room.price, [Validators.required]],
        })
      })
    }
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

  clear(){
    this.form.reset()
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
    if(localStorage.getItem('hotel-id')){
      this.roomService.newRoom(room)
      .pipe(first())
      .subscribe({
        next: (res) => {
          localStorage.setItem('room-id', res['data'])
          this.notificationService.onSuccess("Add room Successfully")
        }, error: () => {
          this.notificationService.onError("Add room Fail")
        }
      })
    }else
    this.notificationService.onError("You need to add hotel before add new room")
    
  }
}
