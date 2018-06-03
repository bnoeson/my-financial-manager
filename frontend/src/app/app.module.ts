import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BnppfService } from './modules/bnppf/bnppf.service';
import { HttpClientModule } from '@angular/common/http';
import { BnppfRecordTableComponent } from './modules/bnppf/components/bnppf-record-table/bnppf-record-table.component';

// Angular Material
import {
  MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule, MatTableModule,
  MatSortModule, MatDialogModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BnppfRecordChartComponent } from './modules/bnppf/components/bnppf-record-chart/bnppf-record-chart.component';
import { BnppfRecordDialogComponent } from "./modules/bnppf/components/bnppf-record-dialog/bnppf-record-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    BnppfRecordTableComponent,
    BnppfRecordChartComponent,
    BnppfRecordDialogComponent
  ],
  imports: [
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
    MatDialogModule
  ],
  providers: [BnppfService],
  bootstrap: [AppComponent],
  entryComponents: [BnppfRecordDialogComponent]
})
export class AppModule { }
