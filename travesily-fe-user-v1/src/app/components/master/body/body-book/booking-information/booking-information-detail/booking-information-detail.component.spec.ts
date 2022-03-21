import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingInformationDetailComponent } from './booking-information-detail.component';

describe('BookingInformationDetailComponent', () => {
  let component: BookingInformationDetailComponent;
  let fixture: ComponentFixture<BookingInformationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingInformationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingInformationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
