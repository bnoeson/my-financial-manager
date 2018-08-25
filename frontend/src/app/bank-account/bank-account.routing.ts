import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceChartPageComponent } from './pages/balance-chart-page/balance-chart-page.component';
import { TransactionFilePageComponent } from './pages/transaction-file-page/transaction-file-page.component';

const appRoutes: Routes = [
  { path: 'balance', component: BalanceChartPageComponent },
  { path: 'transaction-file', component: TransactionFilePageComponent }
];

export const BankAccountRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
