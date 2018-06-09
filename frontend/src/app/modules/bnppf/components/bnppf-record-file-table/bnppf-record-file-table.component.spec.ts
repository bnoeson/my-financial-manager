import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BnppfRecordFileTableComponent } from './bnppf-record-file-table.component';
import {BnppfRecordTableComponent} from "../bnppf-record-table/bnppf-record-table.component";

describe('BnppfRecordFileTableComponent', () => {
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
