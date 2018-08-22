import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFileTableComponent } from './transaction-file-table.component';
import {TransactionTableComponent} from "../transaction-table/transaction-table.component";

describe('TransactionFileTableComponent', () => {
  let component: TransactionTableComponent;
  let fixture: ComponentFixture<TransactionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
