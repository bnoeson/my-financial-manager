import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceChartPageComponent } from './bank-account/pages/balance-chart-page/balance-chart-page.component';
import { TransactionFilePageComponent } from './bank-account/pages/transaction-file-page/transaction-file-page.component';

const appRoutes: Routes = [
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
