import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobsDetallePage } from './mobs-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: MobsDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobsDetallePageRoutingModule {}
