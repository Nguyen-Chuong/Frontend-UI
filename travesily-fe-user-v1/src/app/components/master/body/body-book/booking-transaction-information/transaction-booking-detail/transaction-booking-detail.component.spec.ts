import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionBookingDetailComponent } from './transaction-booking-detail.component';

describe('TransactionBookingDetailComponent', () => {
  let component: TransactionBookingDetailComponent;
  let fixture: ComponentFixture<TransactionBookingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionBookingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionBookingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
