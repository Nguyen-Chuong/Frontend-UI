import { NotificationService } from 'src/app/_services/notification.service';
import { RoomService } from 'src/app/_services/room.service';
import { ImageRequest } from './../../_models/image-request';
import { Component, Input, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/_models/file-upload';
import { FirebaseService } from 'src/app/_services/firebase.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-test-upload',
  templateUrl: './test-upload.component.html',
  styleUrls: ['./test-upload.component.scss']
})
export class TestUploadComponent implements OnInit {

  @Input() id = null
  @Input() folder: string

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  imageRequest: ImageRequest = new ImageRequest
  canSave = false
  constructor(private uploadService: FirebaseService,
    private roomService: RoomService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;

  }

  randomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  upload(): void {
    this.imageRequest.roomTypeId = this.id
    for (var i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles.item(i);
      this.currentFileUpload = new FileUpload(file);
      const imageId = this.randomString(12)
      this.uploadService.pushFileToStorage(this.currentFileUpload, this.folder, this.id, imageId)

    }
    this.uploadService.getStorageUrl().subscribe({
      next: (rs) => {
        this.imageRequest.sourceUrl.push(rs)
        this.canSave = true
      }
    })
    this.notificationService.onSuccess("Upload images for room Successfully")
  }

  addListImageForRoomType() {
    this.roomService.addListImageForRoomType(this.imageRequest)
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.notificationService.onSuccess("Add images for room Successfully")
        }, error: error => {
          this.notificationService.onError("Add images for room False")
        }
      })
  }

}
