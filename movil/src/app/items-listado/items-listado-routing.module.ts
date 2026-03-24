import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsListadoPage } from './items-listado.page';

const routes: Routes = [
  {
    path: '',
    component: ItemsListadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsListadoPageRoutingModule {}
