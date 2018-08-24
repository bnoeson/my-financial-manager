import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceChartPageComponent } from './balance-chart-page.component';

describe('BalanceChartPageComponent', () => {
  let component: BalanceChartPageComponent;
  let fixture: ComponentFixture<BalanceChartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceChartPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceChartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
