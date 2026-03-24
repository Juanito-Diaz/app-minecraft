import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobsListadoPage } from './mobs-listado.page';

const routes: Routes = [
  {
    path: '',
    component: MobsListadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobsListadoPageRoutingModule {}
