import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDropdownNameComponent } from './edit-dropdown-name.component';

describe('EditDropdownNameComponent', () => {
  let component: EditDropdownNameComponent;
  let fixture: ComponentFixture<EditDropdownNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDropdownNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDropdownNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
