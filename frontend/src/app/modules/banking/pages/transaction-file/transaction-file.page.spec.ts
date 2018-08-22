import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFilePage } from './transaction-file.page';

describe('TransactionFilePage', () => {
  let component: TransactionFilePage;
  let fixture: ComponentFixture<TransactionFilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionFilePage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionFilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
