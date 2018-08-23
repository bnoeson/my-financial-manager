import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BalanceChartPage} from './modules/banking/pages/balance-chart/balance-chart.page';
import {TransactionFilePage} from './modules/banking/pages/transaction-file/transaction-file.page';

const appRoutes: Routes = [
  { path: 'balance', component: BalanceChartPage },
  { path: 'transaction-file', component: TransactionFilePage }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
