import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { homeComponent } from './home.component';


const appRoutes: Routes = [

  {path: 'home', component: homeComponent},
  {path: '', component: homeComponent},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);