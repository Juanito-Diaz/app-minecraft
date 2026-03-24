import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiomasDetallePage } from './biomas-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: BiomasDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiomasDetallePageRoutingModule {}
