import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiomasDetallePageRoutingModule } from './biomas-detalle-routing.module';

import { BiomasDetallePage } from './biomas-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiomasDetallePageRoutingModule
  ],
  declarations: [BiomasDetallePage]
})
export class BiomasDetallePageModule {}
