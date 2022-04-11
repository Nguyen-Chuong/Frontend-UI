import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private service: NotificationsService
  ) { }

   onSuccess(message: any){
    this.service.success('Success', message, {
      position: ['top', 'left'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    })
  }

  onError(message: any){
    this.service.error('Fail', message, {
      position: ["top", "left"],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    })
  }
}
