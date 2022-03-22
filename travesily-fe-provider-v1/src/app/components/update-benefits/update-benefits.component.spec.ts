import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBenefitsComponent } from './update-benefits.component';

describe('UpdateBenefitsComponent', () => {
  let component: UpdateBenefitsComponent;
  let fixture: ComponentFixture<UpdateBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBenefitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
