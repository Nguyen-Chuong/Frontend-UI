import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCodComponent } from './booking-cod.component';

describe('BookingCodComponent', () => {
  let component: BookingCodComponent;
  let fixture: ComponentFixture<BookingCodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingCodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingCodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
