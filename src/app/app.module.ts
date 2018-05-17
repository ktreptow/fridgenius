// Import aller benutzen Module

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injectable } from '@angular/core';
import { MaterialAppModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { routing } from './app-routing.module';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { homeComponent } from './home.component';
import { productComponent } from './product.component';
import { createComponent } from './create.component';
import { changeComponent } from './change.component';


@NgModule({
  declarations: [
    AppComponent,
    homeComponent,
    productComponent,
    createComponent,
    changeComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialAppModule,
    FormsModule,
    routing,
    HttpModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
