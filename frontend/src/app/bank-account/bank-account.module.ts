import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatSortModule, MatTableModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { BalanceChartComponent } from './components/balance-chart/balance-chart.component';
import { TransactionDialogComponent } from './components/transaction-dialog/transaction-dialog.component';
import { TransactionFileTableComponent } from './components/transaction-file-table/transaction-file-table.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { BalanceChartPageComponent } from './pages/balance-chart-page/balance-chart-page.component';
import { TransactionFilePageComponent } from './pages/transaction-file-page/transaction-file-page.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDaterangepickerMd,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
  ],
  declarations: [
    TransactionTableComponent,
    BalanceChartComponent,
    TransactionDialogComponent,
    BalanceChartPageComponent,
    TransactionFilePageComponent,
    TransactionFileTableComponent
  ],
  entryComponents: [TransactionDialogComponent]
})
export class BankAccountModule { }
