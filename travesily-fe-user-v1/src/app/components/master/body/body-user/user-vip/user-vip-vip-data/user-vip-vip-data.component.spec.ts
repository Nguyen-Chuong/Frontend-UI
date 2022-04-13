import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVipVipDataComponent } from './user-vip-vip-data.component';

describe('UserVipVipDataComponent', () => {
  let component: UserVipVipDataComponent;
  let fixture: ComponentFixture<UserVipVipDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVipVipDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVipVipDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
