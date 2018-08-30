import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashflowChartPageComponent } from './cashflow-chart-page.component';

describe('CashflowChartPageComponent', () => {
  let component: CashflowChartPageComponent;
  let fixture: ComponentFixture<CashflowChartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashflowChartPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashflowChartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
