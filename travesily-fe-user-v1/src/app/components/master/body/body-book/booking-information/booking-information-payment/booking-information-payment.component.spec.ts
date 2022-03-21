import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingInformationPaymentComponent } from './booking-information-payment.component';

describe('BookingInformationPaymentComponent', () => {
  let component: BookingInformationPaymentComponent;
  let fixture: ComponentFixture<BookingInformationPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingInformationPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingInformationPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
