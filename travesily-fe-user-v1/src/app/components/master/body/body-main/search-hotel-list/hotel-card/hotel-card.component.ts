import {Component, Input, OnInit} from '@angular/core';
import {Hotel} from "../../../../../../_models/hotel";
import {first} from "rxjs";
import {HotelService} from "../../../../../../_services/hotel.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CryptoService} from "../../../../../../_services/crypto.service";
import {Benefit} from "../../../../../../_models/benefit";
import {BenefitType} from "../../../../../../_models/benefit-type";

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit {
  @Input() hotel: Hotel
  benefits: Benefit[] = []

  constructor(private hotelService: HotelService,
              private router: Router,
              private cryptoService: CryptoService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.hotelService.listBenefitsByHotelId(this.cryptoService.set('06052000', this.hotel.id)).pipe(first()).subscribe(
      rs => {
        const benefitTypes: BenefitType[] = rs['data'] ? rs['data'] : []
        benefitTypes.forEach(rs => {
          rs.benefits.forEach(rs => {
            this.benefits.push(rs)
          })
        })
      }
    )
  }

  selectRoom() {
    this.activatedRoute.queryParams.subscribe(
      rs => {
        const from = rs['from']
        const to = rs['to']
        this.router.navigate(['/main/hotel-detail'], {
          queryParams: {
            hotelId: this.cryptoService.set('06052000', this.hotel.id)
          }
        })
      })
  }
}
