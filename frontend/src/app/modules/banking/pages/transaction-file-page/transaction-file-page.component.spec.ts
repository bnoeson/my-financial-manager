import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFilePageComponent } from './transaction-file-page.component';

describe('TransactionFilePageComponent', () => {
  let component: TransactionFilePageComponent;
  let fixture: ComponentFixture<TransactionFilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionFilePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionFilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
