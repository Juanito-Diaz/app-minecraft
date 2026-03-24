import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventariosDetallePage } from './inventarios-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: InventariosDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventariosDetallePageRoutingModule {}
