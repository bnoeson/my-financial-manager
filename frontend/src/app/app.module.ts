import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { BnppfService } from './modules/bnppf/bnppf.service';
import { BnppfRecordTableComponent } from './modules/bnppf/components/bnppf-record-table/bnppf-record-table.component';
import { BnppfComponent } from './modules/bnppf/pages/bnppf/bnppf.component';

// Angular Material
import {
  MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule, MatTableModule,
  MatSortModule, MatDialogModule, MatSidenavModule, MatIconModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BnppfRecordChartComponent } from './modules/bnppf/components/bnppf-record-chart/bnppf-record-chart.component';
import { BnppfRecordDialogComponent } from "./modules/bnppf/components/bnppf-record-dialog/bnppf-record-dialog.component";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {FormsModule} from "@angular/forms";
import {routing} from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    BnppfRecordTableComponent,
    BnppfRecordChartComponent,
    BnppfRecordDialogComponent,
    BnppfComponent
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
  providers: [BnppfService],
  bootstrap: [AppComponent],
  entryComponents: [BnppfRecordDialogComponent]
})
export class AppModule { }
