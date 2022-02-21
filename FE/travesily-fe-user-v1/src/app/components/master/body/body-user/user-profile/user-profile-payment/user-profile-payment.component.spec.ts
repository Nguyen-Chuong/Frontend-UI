import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePaymentComponent } from './user-profile-payment.component';

describe('UserProfilePaymentComponent', () => {
  let component: UserProfilePaymentComponent;
  let fixture: ComponentFixture<UserProfilePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfilePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfilePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
