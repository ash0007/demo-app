import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyloadService } from './lazyload/lazyload.service';
import { HttpService } from './http/http.service';

const imports = [ CommonModule ];
const providers = [ LazyloadService, HttpService ];

@NgModule({
  imports,
  providers
})
export class CommonUtilModule { }
