// Modul zum Routing zwischen den Seiten

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { homeComponent } from './home.component';
import { productComponent } from './product.component';
import { createComponent } from './create.component';
import { changeComponent } from './change.component';


const appRoutes: Routes = [

  {path: 'home', component: homeComponent},
  // {path: 'product/:ean', component: productComponent},
  {path: 'product/:ean', component: productComponent},
  {path: 'product/:stock_id/:ean', component: productComponent},
  {path: 'product/:stock_id/:ean/change/:stock_id', component: changeComponent},
  {path: 'add', component: createComponent},
  {path: '', component: homeComponent},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);