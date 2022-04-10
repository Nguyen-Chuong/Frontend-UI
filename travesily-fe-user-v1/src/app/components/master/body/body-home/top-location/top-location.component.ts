import {Component, OnInit} from '@angular/core';
import {LocationService} from "../../../../../_services/location.service";
import {CryptoService} from "../../../../../_services/crypto.service";
import {District} from "../../../../../_models/district";

@Component({
  selector: 'app-top-location',
  templateUrl: './top-location.component.html',
  styleUrls: ['./top-location.component.scss']
})
export class TopLocationComponent implements OnInit {
  districts: District[] = []

  constructor(private locationService: LocationService, private cryptoService: CryptoService) {
  }

  ngOnInit(): void {
    this.locationService.getTopLocation(this.cryptoService.set('06052000', 12)).subscribe({
      next: districts => {
        this.districts = districts['data']
      }
    })
  }
}
