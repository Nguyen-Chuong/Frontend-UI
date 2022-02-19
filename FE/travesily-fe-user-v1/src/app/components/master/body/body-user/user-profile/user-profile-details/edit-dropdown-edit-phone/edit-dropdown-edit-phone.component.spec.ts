import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDropdownEditPhoneComponent } from './edit-dropdown-edit-phone.component';

describe('EditDropdownEditPhoneComponent', () => {
  let component: EditDropdownEditPhoneComponent;
  let fixture: ComponentFixture<EditDropdownEditPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDropdownEditPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDropdownEditPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
