import {Component, Directive, Inject, Injectable, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {HotelService} from "../../../../../../_services/hotel.service";
import {first} from "rxjs";
import {Router} from "@angular/router";
import {LocationService} from "../../../../../../_services/location.service";
import {
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDateRangeSelectionStrategy
} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
// tslint:disable-next-line:no-duplicate-imports
import {SearchFilter} from "../../../../../../_models/search-filter";
import {ResultSearch} from "../../../../../../_models/result-search";
import {StorageService} from "../../../../../../_services/storage.service";


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


@Injectable()
export class MaxRangeSelectionStrategy<D>
  implements MatDateRangeSelectionStrategy<D> {
  start: any;
  public delta: number;

  constructor(private _dateAdapter: DateAdapter<D>) {
  }

  selectionFinished(date: D, currentRange: DateRange<D>) {
    let {start, end} = currentRange;
    if (start == null || (start && end)) {
      start = date;
      end = null;
    } else if (end == null) {
      const maxDate = this._dateAdapter.addCalendarDays(start, this.delta);
      end = date ? (date > maxDate ? maxDate : date) : null;
    }

    return new DateRange<D>(start, end);
  }

  createPreview(
    activeDate: D | null,
    currentRange: DateRange<D>
  ): DateRange<D> {
    if (currentRange.start && !currentRange.end) {
      const maxDate = this._dateAdapter.addCalendarDays(
        currentRange.start,
        this.delta
      );
      const rangeEnd = activeDate
        ? activeDate > maxDate
          ? maxDate
          : activeDate
        : null;

      return new DateRange(currentRange.start, rangeEnd);
    }

    return new DateRange<D>(null, null);
  }
}

@Injectable()
export class MinRangeSelectionStrategy<D>
  implements MatDateRangeSelectionStrategy<D> {
  start: any;
  public delta: number;

  constructor(private _dateAdapter: DateAdapter<D>) {
  }

  selectionFinished(date: D, currentRange: DateRange<D>) {
    let {start, end} = currentRange;
    if (start == null || (start && end)) {
      start = date;
      end = null;
    } else if (end == null) {
      const minDate = this._dateAdapter.addCalendarDays(start, this.delta);
      end = date ? (date < minDate ? minDate : date) : null;
    }

    return new DateRange<D>(start, end);
  }

  createPreview(
    activeDate: D | null,
    currentRange: DateRange<D>
  ): DateRange<D> {
    if (currentRange.start && !currentRange.end) {
      const minDate = this._dateAdapter.addCalendarDays(
        currentRange.start,
        this.delta
      );
      const rangeEnd = activeDate
        ? activeDate < minDate
          ? minDate
          : activeDate
        : null;

      return new DateRange(currentRange.start, rangeEnd);
    }

    return new DateRange<D>(null, null);
  }
}


@Directive({
  selector: "[maxRange]",
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: MaxRangeSelectionStrategy
    }
  ]
})
export class MaxRangeDirective {
  constructor(
    @Inject(MAT_DATE_RANGE_SELECTION_STRATEGY)
    private maxRangeStrategy: MaxRangeSelectionStrategy<any>
  ) {
  }

  @Input() set maxRange(value: number) {
    this.maxRangeStrategy.delta = +value || 7;
  }
}

@Directive({
  selector: "[minRange]",
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: MinRangeSelectionStrategy
    }
  ]
})
export class MinRangeDirective {
  constructor(
    @Inject(MAT_DATE_RANGE_SELECTION_STRATEGY)
    private minRangeStrategy: MinRangeSelectionStrategy<any>
  ) {
  }

  @Input() set minRange(value: number) {
    this.minRangeStrategy.delta = +value || 1;
  }
}


@Component({
  selector: 'app-hotel-home',
  templateUrl: './hotel-home.component.html',
  styleUrls: ['./hotel-home.component.scss'],
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
export class HotelHomeComponent implements OnInit {
  results: ResultSearch[]
  todayDate: Date = new Date();
  tomorrowDate: Date = new Date(new Date().setDate(this.todayDate.getDate() + 1))

  // someDate: Date = new Date(anydate);

  hotelForm = new FormGroup({
    destination: new FormControl('', [Validators.required]),
    from: new FormControl(this.todayDate, [Validators.required]),
    to: new FormControl(this.tomorrowDate, [Validators.required]),
    guestNumber: new FormControl(0, [Validators.required, Validators.min(1)]),
    roomNumber: new FormControl(0, [Validators.required, Validators.min(1)])
  })

  constructor(private hotelService: HotelService,
              private router: Router,
              private locationService: LocationService,
              private storage: StorageService) {
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
      if (district !== undefined) {
        const filter = new SearchFilter()
        filter.destination = district
        filter.from = new Date(val.from)
        filter.to = new Date(val.to)
        filter.guestNumber = val.guestNumber
        filter.roomNumber = val.roomNumber
        console.log(filter)
        this.storage.searchFilter = filter
        this.router.navigate(['/main/search-hotel-list'])
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
