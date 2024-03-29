import { RoomService } from './../../_services/room.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { City } from 'src/app/_models/city';
import { District } from 'src/app/_models/district';
import { Hotel } from 'src/app/_models/hotel';
import { CryptoService } from 'src/app/_services/crypto.service';
import { HotelService } from 'src/app/_services/hotel.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { Room } from 'src/app/_models/room';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.scss']
})
export class UpdateRoomComponent implements OnInit {
  currentTask = "My Room"
  hotelControl: FormControl
  roomControl: FormControl
  form: FormGroup
  hotel: Hotel = new Hotel
  hotelId: any
  cities: City[]
  districts: District[]
  isEnable = true
  isDisable = true
  checked: boolean
  encryptedRoomId: string
  hotels: Hotel[]
  rooms: Room[]
  room: Room = new Room
  folder = "roomType"
  isSelectedRoom = false
  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private cryptoService: CryptoService,
    public dialog: MatDialog,
    private roomService: RoomService,
    private notificationService: NotificationService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      availableRooms: ['', Validators.required],
      numberOfPeople: ['', Validators.required],
      price: ['', Validators.required],
      dealPercentage: [''],
      dealExpire: ['']
    })
    this.hotelControl = new FormControl('', Validators.required);
    this.roomControl = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    this.hotelService.getAllHotel().pipe(first()).subscribe(res => {
      this.hotels = res['data']
    })
  }

  submit() {
    const val = this.form.value
    this.room.name = val.name
    this.room.quantity = val.quantity
    this.room.availableRooms = val.availableRooms
    this.room.numberOfPeople = val.numberOfPeople
    this.room.price = val.price
    this.room.dealPercentage = val.dealPercentage
    this.room.dealExpire = val.dealExpire
    if (this.roomControl.value === "newRoom") {
      this.room.hotelId = this.hotelId
      this.room.status = 1
      this.roomService.newRoom(this.room).pipe(first()).subscribe({
        next: () => {
          this.notificationService.onSuccess('Add Room successfully');
        },
        error: err => {
          console.log(err)
          this.notificationService.onError('Update Room fail')
        }
      })
    } else {
      this.roomService.updateRoom(this.room).pipe(first()).subscribe({
        next: () => {
          this.notificationService.onSuccess('Update Room successfully');
        },
        error: err => {
          console.log(err)
          this.notificationService.onError('Update Room fail')
        }
      })
    }
  }

  changeHotel(hotel: Hotel) {
    this.hotelId = hotel.id
    const encryptedId = this.cryptoService.set('06052000', hotel.id)
    this.roomService.getAllRoomOfHotel(encryptedId).pipe(first()).subscribe(res => {
      this.rooms = res['data']
      this.isSelectedRoom = false
    })
  }

  changeRoom(room: Room) {
    if (this.roomControl.value === "newRoom") {
      this.form.reset()
    } else {
      this.encryptedRoomId = this.cryptoService.set('06052000', room.id)
      this.roomService.getRoomDetail(this.encryptedRoomId).pipe(first()).subscribe(res => {
        this.room = res['data']
        if (this.room.status === 1)
          this.isDisable = false
        if (this.room.status === 0)
          this.isEnable = false
        this.form = this.fb.group({
          name: [this.room.name],
          quantity: [this.room.quantity],
          availableRooms: [this.room.availableRooms],
          numberOfPeople: [this.room.numberOfPeople],
          price: [this.room.price],
          dealPercentage: [this.room.dealPercentage],
          dealExpire: [this.room.dealExpire]
        })
      })
    }
    this.isSelectedRoom = true
  }

  disableRoom() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { checked: this.checked, message: "Are you sure you want to Disable this Room" },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.checked = result['checked']
      if (this.checked) {
        this.roomService.disableRoom(this.encryptedRoomId).pipe(first()).subscribe({
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

  enableRoom() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { checked: this.checked, message: "Are you sure you want to Enable this Room" },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.checked = result['checked']
      if (this.checked) {
        this.roomService.enableRoom(this.encryptedRoomId).pipe(first()).subscribe({
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
}
