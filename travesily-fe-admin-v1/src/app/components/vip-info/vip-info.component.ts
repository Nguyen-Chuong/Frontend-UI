import { VipService } from './../../_services/vip.service';
import { Component, OnInit } from '@angular/core';
import { Vip } from 'src/app/_models/vip';
import { first } from 'rxjs';

@Component({
  selector: 'app-vip-info',
  templateUrl: './vip-info.component.html',
  styleUrls: ['./vip-info.component.scss']
})
export class VipInfoComponent implements OnInit {
  vips : Vip[]
  constructor(
    private vipService: VipService
  ) { }

  ngOnInit(): void {
    this.vipService.getVip().pipe(first()).subscribe(rs =>{
      this.vips = rs['data']
    })
  }
}
