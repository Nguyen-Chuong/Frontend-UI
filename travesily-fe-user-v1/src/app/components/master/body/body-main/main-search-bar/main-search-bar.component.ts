import {Component, Directive, Inject, Injectable, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs";
import {Router} from "@angular/router";
import {
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDateRangeSelectionStrategy
} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import * as _rollupMoment from 'moment';
import {ResultSearch} from "../../../../../_models/result-search";
import {HotelService} from "../../../../../_services/hotel.service";
import {LocationService} from "../../../../../_services/location.service";
import {SearchFilter} from "../../../../../_models/search-filter";

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-main-search-bar',
  templateUrl: './main-search-bar.component.html',
  styleUrls: ['./main-search-bar.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})


export class MainSearchBarComponent implements OnInit {
  results: ResultSearch[] = []
  todayDate: Date = new Date();
  tomorrowDate: Date = new Date(new Date().setDate(this.todayDate.getDate() + 1))
  filter: SearchFilter = new SearchFilter()

  // someDate: Date = new Date(anydate);

  hotelForm

  constructor(private hotelService: HotelService,
              private router: Router,
              private locationService: LocationService,
              private fb: FormBuilder) {
    this.filter = this.hotelService.searchFilter
    this.results?.push(this.filter.destination)
    // this.hotelForm.controls['destination'].setValue(this.filter.destination.resultSearch)
    // // this.hotelForm.controls['from'].setValue(new Date(this.filter.from))
    // // this.hotelForm.controls['to'].setValue(this.filter.to)
    // this.hotelForm.controls['guestNumber'].setValue(this.filter.guestNumber)
    // this.hotelForm.controls['roomNumber'].setValue(this.filter.roomNumber)
    this.hotelForm = fb.group({
      destination: new FormControl(this.filter.destination.resultSearch, [Validators.required]),
      from: new FormControl(this.filter.from, [Validators.required]),
      to: new FormControl(this.filter.to, [Validators.required]),
      guestNumber: new FormControl(this.filter.guestNumber, [Validators.required, Validators.min(1)]),
      roomNumber: new FormControl(this.filter.roomNumber, [Validators.required, Validators.min(1)])
    })
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
      const district = this.results?.filter(rs => rs.resultSearch === val.destination)[0]
      if (district !== null) {
        const filter = new SearchFilter()
        filter.destination = district
        filter.from = val.from
        filter.to = val.to
        filter.guestNumber = val.guestNumber
        filter.roomNumber = val.roomNumber
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
