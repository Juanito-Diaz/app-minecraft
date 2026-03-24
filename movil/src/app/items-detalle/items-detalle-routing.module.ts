import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsDetallePage } from './items-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ItemsDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsDetallePageRoutingModule {}
