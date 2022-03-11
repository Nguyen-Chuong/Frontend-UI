import {Component, OnInit} from '@angular/core';
import {first} from "rxjs";
import {HotelService} from "../../../../../_services/hotel.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Hotel} from "../../../../../_models/hotel";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {LocationService} from "../../../../../_services/location.service";
import {District} from "../../../../../_models/district";

@Component({
  selector: 'app-search-hotel-list',
  templateUrl: './search-hotel-list.component.html',
  styleUrls: ['./search-hotel-list.component.scss']
})
export class SearchHotelListComponent implements OnInit {
  hotels: Hotel[]
  districts: District[]
  isLowToHigh: boolean = null
  hotelForm = new FormGroup({
    destination: new FormControl('abc', [Validators.required]),
    from: new FormControl(new Date(), [Validators.required]),
    to: new FormControl(new Date(), [Validators.required]),
    guestNumber: new FormControl(0, [Validators.required, Validators.min(1)]),
    roomNumber: new FormControl(0, [Validators.required, Validators.min(1)])
  })

  constructor(private hotelService: HotelService,
              private activatedRoute: ActivatedRoute,
              private locationService: LocationService,
              private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(
      rs => {
        const destination = rs['destination']
        const from = rs['from']
        const to = rs['to']
        const guestNumber = rs['guestNumber']
        const roomNumber = rs['roomNumber']
        console.log(from)
        console.log(to)
        hotelService.searchHotel(destination, from, to, guestNumber, roomNumber, 0, 10)
          .pipe(first())
          .subscribe(
            rs => {
              this.hotels = rs['data']['items']
            },
            error => {
              console.log(error)
            }
          )
      }
    )

  }

  ngOnInit(): void {
  }

  search() {
    const val = this.hotelForm.value
    if (val.destination, val.from, val.to, val.guestNumber, val.roomNumber) {
      const district = this.districts.filter(rs => rs.nameDistrict === val.destination)[0]
      if (district !== null){
        this.router.navigate(['/main/search-hotel-list'], {
          queryParams: {
            destination: district.id,
            from: val.from,
            to: val.to,
            guestNumber: val.guestNumber,
            roomNumber: val.roomNumber
          }
        })
      }
    }
  }

  onSearchHotelChange($event) {
    this.locationService.searchDistrict((<HTMLInputElement>$event.target).value).pipe(first()).subscribe(
      rs => {
        this.districts = rs['data']
      }
    )
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }

  togglePrice() {
    this.isLowToHigh ?? (this.isLowToHigh = false)
    this.isLowToHigh = !this.isLowToHigh
    this.sortHotels()
  }

  sortHotels() {
    this.hotels.sort((n1, n2) => {
      if (n1.price > n2.price)
        return this.isLowToHigh ? 1 : -1
      if (n1.price < n2.price)
        return this.isLowToHigh ? -1 : 1
      return 0
    })
  }
}
