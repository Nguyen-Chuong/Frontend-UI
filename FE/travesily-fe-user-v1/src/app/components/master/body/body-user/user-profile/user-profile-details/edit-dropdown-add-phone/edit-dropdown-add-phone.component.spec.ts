import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDropdownAddPhoneComponent } from './edit-dropdown-add-phone.component';

describe('EditDropdownAddPhoneComponent', () => {
  let component: EditDropdownAddPhoneComponent;
  let fixture: ComponentFixture<EditDropdownAddPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDropdownAddPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDropdownAddPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
