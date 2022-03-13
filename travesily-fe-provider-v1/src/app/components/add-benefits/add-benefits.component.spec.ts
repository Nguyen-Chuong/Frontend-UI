import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBenefitsComponent } from './add-benefits.component';

describe('AddBenefitsComponent', () => {
  let component: AddBenefitsComponent;
  let fixture: ComponentFixture<AddBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBenefitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
