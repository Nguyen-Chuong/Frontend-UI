import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingDetailCardComponent } from './user-booking-detail-card.component';

describe('UserBookingDetailCardComponent', () => {
  let component: UserBookingDetailCardComponent;
  let fixture: ComponentFixture<UserBookingDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBookingDetailCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookingDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
