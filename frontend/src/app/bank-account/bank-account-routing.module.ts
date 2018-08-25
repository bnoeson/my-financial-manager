import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceChartPageComponent } from './pages/balance-chart-page/balance-chart-page.component';
import { TransactionFilePageComponent } from './pages/transaction-file-page/transaction-file-page.component';

const bankAccountRoutes: Routes = [
  { path: 'balance', component: BalanceChartPageComponent },
  { path: 'transaction-file', component: TransactionFilePageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(bankAccountRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BankAccountRoutingModule { }
