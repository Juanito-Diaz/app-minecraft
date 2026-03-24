import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobsCrearPage } from './mobs-crear.page';

const routes: Routes = [
  {
    path: '',
    component: MobsCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobsCrearPageRoutingModule {}
