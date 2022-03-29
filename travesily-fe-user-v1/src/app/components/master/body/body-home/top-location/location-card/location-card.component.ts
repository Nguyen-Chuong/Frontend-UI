import {Component, Input, OnInit} from '@angular/core';
import {District} from "../../../../../../_models/district";
import {Router} from "@angular/router";
import {StorageService} from "../../../../../../_services/storage.service";
import {SearchFilter} from "../../../../../../_models/search-filter";
import {CryptoService} from "../../../../../../_services/crypto.service";

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss']
})
export class LocationCardComponent implements OnInit {
  @Input() district: District

  constructor(private router: Router, private storageService: StorageService, private cryptoService: CryptoService) {
  }

  ngOnInit(): void {
  }

  redirectLocationSearch() {
    const defaultFilter = new SearchFilter()
    const today = new Date()
    defaultFilter.from = new Date(today.setDate(today.getDate() + 1))
    defaultFilter.to = new Date(today.setDate(today.getDate() + 1))
    defaultFilter.guestNumber = 2
    defaultFilter.roomNumber = 1
    defaultFilter.destination = {
      id: this.district.id,
      resultSearch: `${this.district.nameDistrict} District, ${this.district.city.nameCity}`
    }
    this.storageService.searchFilter = defaultFilter
    this.router.navigate(['/main/search-hotel-list'])
  }
}
