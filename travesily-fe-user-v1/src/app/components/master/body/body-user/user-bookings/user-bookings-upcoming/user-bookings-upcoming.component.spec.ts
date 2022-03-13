import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingsUpcomingComponent } from './user-bookings-upcoming.component';

describe('UserBookingsUpcomingComponent', () => {
  let component: UserBookingsUpcomingComponent;
  let fixture: ComponentFixture<UserBookingsUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBookingsUpcomingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookingsUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
