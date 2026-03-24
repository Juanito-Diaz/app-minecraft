import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventariosCrearPage } from './inventarios-crear.page';

const routes: Routes = [
  {
    path: '',
    component: InventariosCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventariosCrearPageRoutingModule {}
