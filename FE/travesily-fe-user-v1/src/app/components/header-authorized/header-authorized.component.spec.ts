import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAuthorizedComponent } from './header-authorized.component';

describe('HeaderAuthorizedComponent', () => {
  let component: HeaderAuthorizedComponent;
  let fixture: ComponentFixture<HeaderAuthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderAuthorizedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
