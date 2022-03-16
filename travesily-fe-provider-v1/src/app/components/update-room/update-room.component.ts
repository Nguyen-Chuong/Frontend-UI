import { RoomService } from './../../_services/room.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { City } from 'src/app/_models/city';
import { District } from 'src/app/_models/district';
import { Hotel } from 'src/app/_models/hotel';
import { CitiesService } from 'src/app/_services/cities.service';
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

  hotelControl: FormControl
  roomControl: FormControl
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
  encryptedRoomId: string
  hotels: Hotel[]
  rooms: Room[]
  room: Room = new Room

  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private citiesService: CitiesService,
    private cryptoService: CryptoService,
    public dialog: MatDialog,
    private roomService: RoomService,
    private notificationService: NotificationService) {
    this.form = fb.group({
      name: [''],
      quantity: [''],
      availableRooms: [''],
      numberOfPeople: [''],
      price: [''],
      dealPercentage: [''],
      dealExpire: ['']
    })

    this.hotelControl = new FormControl(this.city, Validators.required);
    this.roomControl = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.hotelId = param['id'].slice(1, -1);
    })
    this.hotelService.getAllHotel().pipe(first()).subscribe(res => {
      this.hotels = res['data']
    })
    this.citiesService.getAllCities().pipe(first()).subscribe(res => {
      this.cities = res['data']
    })
  }

  submit() {
    const val = this.form.value
    if (val.name)
      this.room.name = val.name
    if (val.quantity)
      this.room.quantity = val.quantity
    if (val.availableRooms)
      this.room.availableRooms = val.availableRooms
    if (val.numberOfPeople)
      this.room.numberOfPeople = val.numberOfPeople
    if (val.price)
      this.room.price = val.price
    if (val.dealPercentage)
      this.room.dealPercentage = val.dealPercentage
    if (val.dealExpire)
      this.room.dealExpire = val.dealExpire
    console.log(this.room)
    this.roomService.updateRoom(this.room).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Update Room successfully');
        //window.location.reload()
      },
      error: err => {
        console.log(err)
        this.notificationService.onError('Update Room false')
      }
    })

  }

  changeHotel(hotel: Hotel) {
    const encryptedId = this.cryptoService.set('06052000', hotel.id)
    this.roomService.getAllRoomOfHotel(encryptedId).pipe(first()).subscribe(res => {
      this.rooms = res['data']
    })
  }

  changeRoom(room: Room) {
    const encryptedId = this.cryptoService.set('06052000', room.id)
    this.roomService.getRoomDetail(encryptedId).pipe(first()).subscribe(res => {
      this.room = res['data']
      this.encryptedRoomId = this.cryptoService.set('06052000', room.id)
      if(this.room.status === 1)
        this.isDisable = false
      if(this.room.status === 2)
        this.isEnable = false
    })
  }

  disableHotel() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { checked: this.checked, message: "Are you sure wanna Disable this Room" },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.checked = result['checked']
      if (this.checked) {
        this.roomService.disableRoom(this.encryptedRoomId).pipe(first()).subscribe({
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
      data: { checked: this.checked, message: "Are you sure wanna Enable this Room" },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.checked = result['checked']
      if (this.checked) {
        this.roomService.enableRoom(this.encryptedRoomId).pipe(first()).subscribe({
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
