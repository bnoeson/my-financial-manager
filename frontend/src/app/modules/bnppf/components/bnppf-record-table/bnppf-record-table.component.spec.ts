import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BnppfRecordTableComponent } from './bnppf-record-table.component';

describe('BnppfRecordTableComponent', () => {
  let component: BnppfRecordTableComponent;
  let fixture: ComponentFixture<BnppfRecordTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BnppfRecordTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BnppfRecordTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
