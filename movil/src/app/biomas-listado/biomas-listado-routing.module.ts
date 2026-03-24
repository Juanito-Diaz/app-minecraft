import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiomasListadoPage } from './biomas-listado.page';

const routes: Routes = [
  {
    path: '',
    component: BiomasListadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiomasListadoPageRoutingModule {}
