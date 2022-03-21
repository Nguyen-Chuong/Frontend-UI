import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingInformationConfirmComponent } from './booking-information-confirm.component';

describe('BookingInformationConfirmComponent', () => {
  let component: BookingInformationConfirmComponent;
  let fixture: ComponentFixture<BookingInformationConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingInformationConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingInformationConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
