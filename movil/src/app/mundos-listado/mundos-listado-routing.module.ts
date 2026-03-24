import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MundosListadoPage } from './mundos-listado.page';

const routes: Routes = [
  {
    path: '',
    component: MundosListadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MundosListadoPageRoutingModule {}
