import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddReviewComponent } from './user-add-review.component';

describe('UserAddReviewComponent', () => {
  let component: UserAddReviewComponent;
  let fixture: ComponentFixture<UserAddReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
