import { NotificationService } from 'src/app/_services/notification.service';
import { BenefitsService } from './../../_services/benefits.service';
import { HotelService } from 'src/app/_services/hotel.service';
import { RoomService } from './../../_services/room.service';
import { CryptoService } from 'src/app/_services/crypto.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Hotel } from 'src/app/_models/hotel';
import { Room } from 'src/app/_models/room';
import { first } from 'rxjs';
import { RoomBenefit } from 'src/app/_models/roomBenefit';

@Component({
  selector: 'app-update-benefits',
  templateUrl: './update-benefits.component.html',
  styleUrls: ['./update-benefits.component.scss']
})
export class UpdateBenefitsComponent implements OnInit {
  currentTask= "Benefits"
  hotelControl: FormControl
  roomControl: FormControl
  hotel: Hotel = new Hotel
  hotels: Hotel[]
  rooms: Room[]
  room: Room
  benefits: RoomBenefit[]
  currentRoomId: number
  isAddBenefit = false
  constructor(
    private cryptoService: CryptoService,
    private roomService: RoomService,
    private hotelService: HotelService,
    private benefitsService: BenefitsService,
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
    this.benefitsService.getBenefitOfRoom(encryptedId).pipe(first()).subscribe(res => {
      this.benefits = res['data']
    })

  }
  deleteBenefit(id) {
    const encryptedId = this.cryptoService.set('06052000', id)
    this.benefitsService.deleteRoomBenefit(encryptedId).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Delete successfully');
        this.changeRoom(this.room)
      },
      error: () => {
        this.notificationService.onError('Delete fail')
      }
    })
  }

  openAddBenefit(){
    this.isAddBenefit = !this.isAddBenefit
  }
}
