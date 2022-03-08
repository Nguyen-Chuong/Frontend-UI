import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {GuestNumber} from "../../../../../../_models/guest-number";
import {HotelService} from "../../../../../../_services/hotel.service";
import {first} from "rxjs";
import {Router} from "@angular/router";
import {LocationService} from "../../../../../../_services/location.service";
import {District} from "../../../../../../_models/district";

@Component({
  selector: 'app-hotel-home',
  templateUrl: './hotel-home.component.html',
  styleUrls: ['./hotel-home.component.scss']
})
export class HotelHomeComponent implements OnInit {
  results: { id: number, resultSearch: string }[]

  hotelForm = new FormGroup({
    destination: new FormControl('', [Validators.required]),
    from: new FormControl(new Date(), [Validators.required]),
    to: new FormControl(new Date(), [Validators.required]),
    guestNumber: new FormControl(0, [Validators.required, Validators.min(1)]),
    roomNumber: new FormControl(0, [Validators.required, Validators.min(1)])
  })

  constructor(private hotelService: HotelService, private router: Router, private locationService: LocationService) {
  }

  ngOnInit(): void {
  }

  updateGuest($event: number) {
    (<FormControl>this.hotelForm.controls['guestNumber']).setValue($event)
  }

  updateRoom($event: number) {
    (<FormControl>this.hotelForm.controls['roomNumber']).setValue($event)
  }

  search() {
    const val = this.hotelForm.value
    if (val.destination, val.from, val.to, val.guestNumber, val.roomNumber) {
      const district = this.results.filter(rs => rs.resultSearch === val.destination)[0]
      if (district !== null) {
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
        this.results = rs['data']
      }
    )
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }

}
