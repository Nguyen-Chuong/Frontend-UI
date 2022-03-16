import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl} from "@angular/forms";
import {GuestNumber} from "../../../_models/guest-number";
import {typeofExpr} from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Output() guestNumberEvent = new EventEmitter<number>()
  @Output() roomNumberEvent = new EventEmitter<number>()
  @Input() inputGuestNum = 0
  @Input() inputRoomNum = 0
  guestNum = 0
  roomNum = 0

  constructor() {
  }

  ngOnInit(): void {
    this.guestNum = this.inputGuestNum
    this.roomNum = this.inputRoomNum
  }


// 1 = guestNumber, 2 = roomNumber
  toggleNumberPlus(type: number) {
    if (type === 1) {
      this.guestNum = this.guestNum + 1
      this.guestNumberEvent.emit(this.guestNum)
    } else if (type === 2) {
      this.roomNum = this.roomNum + 1
      this.roomNumberEvent.emit(this.roomNum)
    }
  }

// 1 = guestNumber, 2 = roomNumber
  toggleNumberMinus(type: number) {
    if(type === 1) {
      this.guestNum = this.guestNum - 1
      this.guestNumberEvent.emit(this.guestNum)
    }
     else if(type === 2){
      this.roomNum = this.roomNum - 1
      this.roomNumberEvent.emit(this.roomNum)
    }
  }
}
