import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyFeedbackComponent } from './body-feedback.component';

describe('BodyFeedbackComponent', () => {
  let component: BodyFeedbackComponent;
  let fixture: ComponentFixture<BodyFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
