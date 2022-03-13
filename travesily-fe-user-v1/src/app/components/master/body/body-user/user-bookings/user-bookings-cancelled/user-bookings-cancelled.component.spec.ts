import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingsCancelledComponent } from './user-bookings-cancelled.component';

describe('UserBookingsCancelledComponent', () => {
  let component: UserBookingsCancelledComponent;
  let fixture: ComponentFixture<UserBookingsCancelledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBookingsCancelledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookingsCancelledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
