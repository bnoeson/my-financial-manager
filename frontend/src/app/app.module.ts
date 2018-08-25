import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { BankAccountModule } from './bank-account/bank-account.module';
import { ApiUrlInterceptor } from './core/api/ApiUrlInterceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRouting,
    HttpClientModule,
    BankAccountModule,

    // UI
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
