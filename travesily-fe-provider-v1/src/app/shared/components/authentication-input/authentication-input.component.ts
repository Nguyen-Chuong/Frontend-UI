import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-authentication-input',
  templateUrl: './authentication-input.component.html',
  styleUrls: ['./authentication-input.component.scss']
})
export class AuthenticationInputComponent implements OnInit {

  @Input() control: FormControl | any
  @Input() type: string | any
  @Input() placeholder: string | any
  @Input() classes: string | any
  @Input() value: string | any

  constructor() {
  }

  ngOnInit(): void {
  }

}
