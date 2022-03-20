import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyBookComponent } from './body-book.component';

describe('BodyBookComponent', () => {
  let component: BodyBookComponent;
  let fixture: ComponentFixture<BodyBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
