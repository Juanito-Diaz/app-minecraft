import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MundosDetallePage } from './mundos-detalle.page'; // Verifica la 's'

const routes: Routes = [
  {
    path: '',
    component: MundosDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MundosDetallePageRoutingModule {}