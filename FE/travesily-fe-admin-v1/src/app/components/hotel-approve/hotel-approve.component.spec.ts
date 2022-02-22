import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelApproveComponent } from './hotel-approve.component';

describe('HotelApproveComponent', () => {
  let component: HotelApproveComponent;
  let fixture: ComponentFixture<HotelApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
