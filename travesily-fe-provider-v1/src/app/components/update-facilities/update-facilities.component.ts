import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Benefit } from 'src/app/_models/benefit';
import { Facility } from 'src/app/_models/facility';
import { Hotel } from 'src/app/_models/hotel';
import { Room } from 'src/app/_models/room';
import { RoomFacility } from 'src/app/_models/roomFacility';
import { BenefitsService } from 'src/app/_services/benefits.service';
import { CryptoService } from 'src/app/_services/crypto.service';
import { FacilitiesService } from 'src/app/_services/facilities.service';
import { HotelService } from 'src/app/_services/hotel.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { RoomService } from 'src/app/_services/room.service';

@Component({
  selector: 'app-update-facilities',
  templateUrl: './update-facilities.component.html',
  styleUrls: ['./update-facilities.component.scss']
})
export class UpdateFacilitiesComponent implements OnInit {
  currentTask= "Facilities"
  hotelControl: FormControl
  roomControl: FormControl
  hotel: Hotel = new Hotel
  hotels: Hotel[]
  rooms: Room[]
  room: Room
  facilities: RoomFacility[]
  isAddFacility = false
  constructor(
    private cryptoService: CryptoService,
    private roomService: RoomService,
    private hotelService: HotelService,
    private facilitiesService: FacilitiesService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.hotelControl = new FormControl('', Validators.required);
    this.roomControl = new FormControl('', Validators.required);

    this.hotelService.getAllHotel().pipe(first()).subscribe(res => {
      this.hotels = res['data']
    })
  }

  changeHotel(hotel: Hotel) {
    const encryptedId = this.cryptoService.set('06052000', hotel.id)
    this.roomService.getAllRoomOfHotel(encryptedId).pipe(first()).subscribe(res => {
      this.rooms = res['data']
    })
  }

  changeRoom(room: Room) {
    this.room = room
    const encryptedId = this.cryptoService.set('06052000', room.id)
    this.facilitiesService.getFacilitiesOfRoom(encryptedId).pipe(first()).subscribe(res => {
      this.facilities = res['data']
    })
console.log(encryptedId)
  }
  deleteFacility(id) {
    const encryptedId = this.cryptoService.set('06052000', id)

    this.facilitiesService.deleteRoomFacilities(encryptedId).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Delete successfully');
        this.changeRoom(this.room)
      },
      error: err => {
        this.notificationService.onError('Delete false')
      }
    })

  }

  openAddFacility(){
    this.isAddFacility = !this.isAddFacility
  }

}
