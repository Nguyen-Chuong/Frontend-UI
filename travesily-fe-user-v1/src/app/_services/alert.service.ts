import { Injectable } from '@angular/core';
import {filter, first, Observable, Subject} from "rxjs";
import {Alert, AlertType} from "../_models/alert";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';
  constructor() { }

  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  success(message: string, options?: any){
    return this.alert(new Alert({...options, type: AlertType.Success, message: message}))
  }

  error(message: string, options?: any){
    return this.alert(new Alert({...options, type: AlertType.Error, message: message}))
  }



  alert(alert: Alert){
    alert.id = alert.id || this.defaultId
    alert.autoClose = (alert.autoClose === undefined ? true : alert.autoClose);
    this.subject.next(alert)
  }

  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }


}
