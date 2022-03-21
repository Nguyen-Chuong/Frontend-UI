import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingVnpayComponent } from './booking-vnpay.component';

describe('BookingVnpayComponent', () => {
  let component: BookingVnpayComponent;
  let fixture: ComponentFixture<BookingVnpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingVnpayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingVnpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
