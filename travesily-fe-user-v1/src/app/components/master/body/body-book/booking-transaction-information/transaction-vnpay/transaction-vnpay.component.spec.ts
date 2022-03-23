import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionVnpayComponent } from './transaction-vnpay.component';

describe('TransactionVnpayComponent', () => {
  let component: TransactionVnpayComponent;
  let fixture: ComponentFixture<TransactionVnpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionVnpayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionVnpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
