import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpCheckerComponent } from './otp-checker.component';

describe('OtpCheckerComponent', () => {
  let component: OtpCheckerComponent;
  let fixture: ComponentFixture<OtpCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
