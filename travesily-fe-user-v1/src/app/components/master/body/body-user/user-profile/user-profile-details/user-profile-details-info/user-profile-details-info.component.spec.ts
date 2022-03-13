import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileDetailsInfoComponent } from './user-profile-details-info.component';

describe('UserProfileDetailsInfoComponent', () => {
  let component: UserProfileDetailsInfoComponent;
  let fixture: ComponentFixture<UserProfileDetailsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileDetailsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
