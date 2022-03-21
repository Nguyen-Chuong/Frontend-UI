import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTransactionInformationComponent } from './booking-transaction-information.component';

describe('BookingTransactionInformationComponent', () => {
  let component: BookingTransactionInformationComponent;
  let fixture: ComponentFixture<BookingTransactionInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingTransactionInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTransactionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
