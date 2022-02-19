import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDropdownPasswordComponent } from './edit-dropdown-password.component';

describe('EditDropdownPasswordComponent', () => {
  let component: EditDropdownPasswordComponent;
  let fixture: ComponentFixture<EditDropdownPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDropdownPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDropdownPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
