import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JugadoresCrearPage } from './jugadores-crear.page';

const routes: Routes = [
  {
    path: '',
    component: JugadoresCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugadoresCrearPageRoutingModule {}
