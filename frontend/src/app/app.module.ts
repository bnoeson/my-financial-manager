import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BnppfService } from './modules/bnppf/bnppf.service';
import { HttpClientModule } from '@angular/common/http';
import { BnppfRecordTableComponent } from './modules/bnppf/components/bnppf-record-table/bnppf-record-table.component';

// Angular Material
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule, MatTableModule,
  MatSortModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BnppfRecordTableComponent
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
    MatSortModule
  ],
  providers: [BnppfService],
  bootstrap: [AppComponent]
})
export class AppModule { }
