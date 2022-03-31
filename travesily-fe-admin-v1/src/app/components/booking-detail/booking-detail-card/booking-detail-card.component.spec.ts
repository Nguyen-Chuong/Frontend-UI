import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDetailCardComponent } from './booking-detail-card.component';

describe('BookingDetailCardComponent', () => {
  let component: BookingDetailCardComponent;
  let fixture: ComponentFixture<BookingDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingDetailCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
