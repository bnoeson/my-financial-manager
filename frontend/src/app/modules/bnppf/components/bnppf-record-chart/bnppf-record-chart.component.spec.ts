import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BnppfRecordChartComponent } from './bnppf-record-chart.component';

describe('BnppfRecordChartComponent', () => {
  let component: BnppfRecordChartComponent;
  let fixture: ComponentFixture<BnppfRecordChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BnppfRecordChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BnppfRecordChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
