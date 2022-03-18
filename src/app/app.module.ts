import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonUtilModule } from './modules/shared/common-util/common-util.module';
import { ElementsModule } from './modules/shared/elements/elements.module';

const declarations = [ AppComponent ];
const imports = [ BrowserModule, BrowserAnimationsModule, AppRoutingModule, CommonUtilModule, ElementsModule ];
const bootstrap = [ AppComponent ];
@NgModule({
  declarations,
  imports,
  bootstrap,
})
export class AppModule { }
