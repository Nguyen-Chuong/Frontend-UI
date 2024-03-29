import { FirebaseService } from 'src/app/_services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { Hotel } from 'src/app/_models/hotel';
import { Room } from 'src/app/_models/room';
import { CryptoService } from 'src/app/_services/crypto.service';
import { HotelService } from 'src/app/_services/hotel.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { RoomService } from 'src/app/_services/room.service';
import { FileUpload } from 'src/app/_models/file-upload';
import { ImageRequest } from 'src/app/_models/image-request';
import { RoomType } from 'src/app/_models/room-type';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-room-image',
  templateUrl: './room-image.component.html',
  styleUrls: ['./room-image.component.scss']
})
export class RoomImageComponent implements OnInit {
  currentTask = "Images"
  hotelControl: FormControl
  roomControl: FormControl
  form: FormGroup
  hotel: Hotel = new Hotel
  hotelId: any
  checked: boolean
  encryptedRoomId: string
  hotels: Hotel[]
  roomTypes: RoomType[]
  roomType: RoomType = new RoomType
  roomTypeId: string
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  imageRequest: ImageRequest = new ImageRequest
  isUploaded = false
  isSelected = false
  overLimit = false
  isRoom = false
  canAdd = false
  canDelete = false
  constructor(
    fb: FormBuilder,
    private hotelService: HotelService,
    private cryptoService: CryptoService,
    public dialog: MatDialog,
    private roomService: RoomService,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private firebaseService: FirebaseService) {
    this.form = fb.group({
      name: [''],
      quantity: [''],
      availableRooms: [''],
      numberOfPeople: [''],
      price: [''],
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

  randomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  changeHotel(hotel: Hotel) {
    this.hotelId = hotel.id
    const encryptedId = this.cryptoService.set('06052000', hotel.id)
    this.roomService.getAllRoomOfHotel(encryptedId).pipe(first()).subscribe(res => {
      this.roomTypes = res['data']
      this.isRoom = false
    })
  }

  changeRoom(room: Room) {
    this.roomTypeId = this.cryptoService.set('06052000', room.id)
    this.roomService.getRoomDetail(this.roomTypeId).pipe(first()).subscribe(res => {
      this.roomType = res['data']
      this.isRoom = true
      if(this.roomType.listImage.length > 0){
        this.canDelete = true
      }else{
        this.canAdd = true
      }
    })
  }

  upload(): void {
    const encryptedId = this.cryptoService.get('06052000', this.roomTypeId)
    this.imageRequest.roomTypeId = encryptedId
    const listUrl = []
    for (var i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles.item(i);
      this.currentFileUpload = new FileUpload(file);
      const imageId = this.randomString(12)
      this.firebaseService.pushFileToStorage(this.currentFileUpload, "roomType", this.roomTypeId, imageId)
    }
    this.firebaseService.getStorageUrl().subscribe({
      next: (rs) => {
        listUrl.push(rs)
        this.isUploaded = true
      }
    })
    this.selectedFiles = undefined
    this.imageRequest.sourceUrl = listUrl
    this.notificationService.onSuccess("Upload images for room Successfully")
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
    const totalImage = this.selectedFiles.length
    if (totalImage > 10 || totalImage < 6) {
      this.overLimit = true
      this.isSelected = false
    } else {
      this.overLimit = false
      this.isSelected = true
    }
  }

  addListImageForRoomType() {
    this.roomService.addListImageForRoomType(this.imageRequest)
      .pipe(first())
      .subscribe({
        next: () => {
          this.roomService.getRoomDetail(this.roomTypeId).pipe(first()).subscribe({next: res => {
            this.roomType = res['data']
          }})
          this.isUploaded = false
          this.canDelete = true
          this.canAdd = false
          this.notificationService.onSuccess("Add images for room Successfully")
        }, error: error => {
          this.notificationService.onError("Add images for room Fail")
          console.log(error)
        }
      })
  }

  deleteListImageForRoomType() {
    this.firebaseService.deleteFile("roomType", this.roomType.id)
    this.roomService.deleteImage(this.roomTypeId).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Delete successfully');
        this.roomType = new RoomType
        this.canDelete = false
        this.canAdd = true
      },
      error: () => {
        this.notificationService.onError('Delete fail')
      }
    })
  }

  open(content) {
    this.overLimit = false
    this.modalService.open(content);
  }
}
