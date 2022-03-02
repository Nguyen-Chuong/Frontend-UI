import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingDetailComponent } from './user-booking-detail.component';

describe('UserBookingDetailComponent', () => {
  let component: UserBookingDetailComponent;
  let fixture: ComponentFixture<UserBookingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBookingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
