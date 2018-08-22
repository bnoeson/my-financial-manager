import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceChartPage } from './balance-chart.page';

describe('BalanceChartPage', () => {
  let component: BalanceChartPage;
  let fixture: ComponentFixture<BalanceChartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceChartPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
