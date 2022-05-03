import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-hotel',
  templateUrl: './new-hotel.component.html',
  styleUrls: ['./new-hotel.component.scss']
})
export class NewHotelComponent implements OnInit {
  currentTask= "New Hotel"
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  roomId: number
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.roomId = +window.localStorage.getItem('room-id')
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required],
    });
  }
}
