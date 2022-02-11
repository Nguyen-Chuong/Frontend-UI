import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {IGuestNumber} from "../../../interfaces/guest-number";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() control: FormControl | any
  guest: IGuestNumber = {id: 0, adult: 0, children: 0, roomNumber: 0}

  btnContent = this.guest.adult? `${this.guest.adult} adults`:'' + this.guest.children? `${this.guest.children} children`:'' + this.guest.roomNumber? `${this.guest.roomNumber} rooms`:'' ;
  constructor() {
  }

  ngOnInit(): void {
  }

  toggleContent() {
    const classList = document.getElementById('content')?.classList
    classList?.contains('active') ? classList.remove('active') : classList?.add('active')

  }

  toggleNumberPlus(itemName: string) {
    itemName === 'adult' ? this.guest.adult++ : itemName === 'children'
      ? this.guest.children++ : itemName === 'room'
        ? this.guest.roomNumber++ : ''
  }


  toggleNumberMinus(itemName: string) {
    itemName === 'adult' ? this.guest.adult-- : itemName === 'children'
      ? this.guest.children-- : itemName === 'room'
        ? this.guest.roomNumber-- : ''
  }
}
