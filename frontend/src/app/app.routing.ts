import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BnppfComponent} from "./modules/bnppf/pages/bnppf/bnppf.component";
import {BnppfImportComponent} from "./modules/bnppf/pages/bnppf-import/bnppf-import.component";

const appRoutes: Routes = [
  { path: 'bnppf', component: BnppfComponent },
  { path: 'bnppf/import', component: BnppfImportComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
