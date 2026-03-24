import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsCrearPage } from './items-crear.page';

const routes: Routes = [
  {
    path: '',
    component: ItemsCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsCrearPageRoutingModule {}
