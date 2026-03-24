import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventariosListadoPage } from './inventarios-listado.page';

const routes: Routes = [
  {
    path: '',
    component: InventariosListadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventariosListadoPageRoutingModule {}
