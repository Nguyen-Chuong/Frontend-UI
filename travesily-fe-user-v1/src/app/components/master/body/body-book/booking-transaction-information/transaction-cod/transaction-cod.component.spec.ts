import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCodComponent } from './transaction-cod.component';

describe('TransactionCodComponent', () => {
  let component: TransactionCodComponent;
  let fixture: ComponentFixture<TransactionCodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
