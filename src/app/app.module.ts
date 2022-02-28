import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MapComponent } from './components/map/map.component';
import { TreeViewComponent } from './components/tree-view/tree-view.component';
import { TreeChildComponent } from './components/tree-view/tree-child/tree-child.component';
import { TreeParentComponent } from './components/tree-view/tree-parent/tree-parent.component';
import { HttpClientModule } from '@angular/common/http';
import { DrawAnimComponent } from './components/draw-anim/draw-anim.component';
import { StockListComponent } from './components/stocks/stock-list/stock-list.component';
import { DemoComponent } from './components/demo/demo.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TreeViewComponent,
    TreeChildComponent,
    TreeParentComponent,
    DrawAnimComponent,
    StockListComponent,
    DemoComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
