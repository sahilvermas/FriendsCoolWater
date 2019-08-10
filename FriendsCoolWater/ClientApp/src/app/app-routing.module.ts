import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutePaths } from './core/helpers/routePaths';

const routes: Routes = RoutePaths;

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
