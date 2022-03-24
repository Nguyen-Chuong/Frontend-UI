import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelMiniCardComponent } from './hotel-mini-card.component';

describe('HotelMiniCardComponent', () => {
  let component: HotelMiniCardComponent;
  let fixture: ComponentFixture<HotelMiniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelMiniCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelMiniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
