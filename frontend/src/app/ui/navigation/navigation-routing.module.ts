import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceChartPageComponent } from '../../bank-account/pages/balance-chart-page/balance-chart-page.component';
import { CashflowChartPageComponent } from '../../bank-account/pages/cashflow-chart-page/cashflow-chart-page.component';
import { TransactionFilePageComponent } from '../../bank-account/pages/transaction-file-page/transaction-file-page.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const navigationRoutes: Routes = [
  {
    path: '', component: SidenavComponent, children: [
      {path: 'balance', component: BalanceChartPageComponent},
      {path: 'cashflow', component: CashflowChartPageComponent},
      {path: 'transaction-file', component: TransactionFilePageComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(navigationRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class NavigationRoutingModule { }
