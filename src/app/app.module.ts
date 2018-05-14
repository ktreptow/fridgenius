import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialAppModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { routing } from './app-routing.module';


import { AppComponent } from './app.component';
import { homeComponent } from './home.component';


@NgModule({
  declarations: [
    AppComponent,
    homeComponent,

  ],
  imports: [
    BrowserModule,
    MaterialAppModule,
    FormsModule,
    routing

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
