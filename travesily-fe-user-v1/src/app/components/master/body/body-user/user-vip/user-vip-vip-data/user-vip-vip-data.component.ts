import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../../../_services/auth.service";
import {Vip} from "../../../../../../_models/vip";

@Component({
  selector: 'app-user-vip-vip-data',
  templateUrl: './user-vip-vip-data.component.html',
  styleUrls: ['./user-vip-vip-data.component.scss']
})
export class UserVipVipDataComponent implements OnInit {
  vips: Vip[] = []
  constructor(private authService: AuthService) {
    authService.getVip().subscribe({
      next: value => {
        this.vips = value['data']
      }
    })
  }

  ngOnInit(): void {
  }
}
