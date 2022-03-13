import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHotelListComponent } from './search-hotel-list.component';

describe('SearchHotelListComponent', () => {
  let component: SearchHotelListComponent;
  let fixture: ComponentFixture<SearchHotelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchHotelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHotelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
