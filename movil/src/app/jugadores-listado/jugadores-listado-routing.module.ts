import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JugadoresListadoPage } from './jugadores-listado.page';

const routes: Routes = [
  {
    path: '',
    component: JugadoresListadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugadoresListadoPageRoutingModule {}
