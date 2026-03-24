import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JugadoresDetallePage } from './jugadores-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: JugadoresDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugadoresDetallePageRoutingModule {}
