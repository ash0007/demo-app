import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClockComponent } from './components/clock/clock.component';
import { DrawAnimComponent } from './components/draw-anim/draw-anim.component';
import { MapComponent } from './components/map/map.component';
import { MapResolver } from './resolver/map.resolver';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
