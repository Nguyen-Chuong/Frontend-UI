import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingsCompletedComponent } from './user-bookings-completed.component';

describe('UserBookingsCompletedComponent', () => {
  let component: UserBookingsCompletedComponent;
  let fixture: ComponentFixture<UserBookingsCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBookingsCompletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookingsCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
