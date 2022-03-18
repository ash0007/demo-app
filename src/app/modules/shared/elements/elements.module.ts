import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MenuComponent } from './components/menu/menu.component';


const declarations = [ MenuComponent ];
const imports = [ CommonModule, MatMenuModule, MatIconModule, MatButtonModule ];
const exports = [ MenuComponent ];

@NgModule({
  declarations,
  imports,
  exports
})
export class ElementsModule { }
