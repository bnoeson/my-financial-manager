import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BankAccountModule } from '../../bank-account/bank-account.module';
import { NavigationRoutingModule } from './navigation-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [
    NavigationRoutingModule,

    CommonModule,
    BankAccountModule,
    RouterModule,

    // UI
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
  ],
  declarations: [ToolbarComponent, SidenavComponent]
})
export class NavigationModule { }
