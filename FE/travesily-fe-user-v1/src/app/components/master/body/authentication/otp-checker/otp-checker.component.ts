import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../../_services/auth.service";

@Component({
  selector: 'app-otp-checker',
  templateUrl: './otp-checker.component.html',
  styleUrls: ['./otp-checker.component.scss']
})
export class OtpCheckerComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onOtpChange($event: string) {
    if($event.length===6){
    }
  }
}
