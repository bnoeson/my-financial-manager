import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BnppfComponent} from "./modules/bnppf/pages/bnppf/bnppf.component";

const appRoutes: Routes = [
  { path: 'bnppf', component: BnppfComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
