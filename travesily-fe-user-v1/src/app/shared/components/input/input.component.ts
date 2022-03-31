import {Component, OnInit, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() control: FormControl | any
  @Input() type: string | any
  @Input() placeholder: string | any
  @Input() classes: string | any
  @Input() label: string | any

  constructor() {
  }

  ngOnInit(): void {
  }
}
