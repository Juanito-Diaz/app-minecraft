import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiomasCrearPage } from './biomas-crear.page';

const routes: Routes = [
  {
    path: '',
    component: BiomasCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiomasCrearPageRoutingModule {}
