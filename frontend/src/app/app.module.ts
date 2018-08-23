import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { TransactionService } from './modules/banking/transaction.service';
import { TransactionTableComponent } from './modules/banking/components/transaction-table/transaction-table.component';
import { BalanceChartPage } from './modules/banking/pages/balance-chart/balance-chart.page';

// Angular Material
import {
  MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule, MatTableModule,
  MatSortModule, MatDialogModule, MatSidenavModule, MatIconModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BalanceChartComponent } from './modules/banking/components/balance-chart/balance-chart.component';
import { TransactionDialogComponent } from "./modules/banking/components/transaction-dialog/transaction-dialog.component";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {FormsModule} from "@angular/forms";
import {routing} from "./app.routing";
import { TransactionFilePage } from './modules/banking/pages/transaction-file/transaction-file.page';
import {TransactionFileTableComponent} from "./modules/banking/components/transaction-file-table/transaction-file-table.component";

import {ApiUrlInterceptor} from "./shared/ApiUrlInterceptor";

@NgModule({
  declarations: [
    AppComponent,
    TransactionTableComponent,
    BalanceChartComponent,
    TransactionDialogComponent,
    BalanceChartPage,
    TransactionFilePage,
    TransactionFileTableComponent
  ],
  imports: [
    routing,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    NgxDaterangepickerMd,
    FormsModule
  ],
  providers: [
    TransactionService,
    {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [TransactionDialogComponent]
})
export class AppModule { }
