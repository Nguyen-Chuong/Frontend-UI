import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPaymentInformationComponent } from './booking-payment-information.component';

describe('BookingPaymentInformationComponent', () => {
  let component: BookingPaymentInformationComponent;
  let fixture: ComponentFixture<BookingPaymentInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingPaymentInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPaymentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
