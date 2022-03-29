import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpComingBookingComponent } from './up-coming-booking.component';

describe('UpComingBookingComponent', () => {
  let component: UpComingBookingComponent;
  let fixture: ComponentFixture<UpComingBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpComingBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpComingBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
