import {Component, Input, OnInit} from '@angular/core';
import {Response} from "../../../../../../../_models/response";

@Component({
  selector: 'app-response-message',
  templateUrl: './response-message.component.html',
  styleUrls: ['./response-message.component.scss']
})
export class ResponseMessageComponent implements OnInit {
  @Input() response: Response
  constructor() { }

  ngOnInit(): void {
  }

}
