import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventariosDetallePageRoutingModule } from './inventarios-detalle-routing.module';

import { InventariosDetallePage } from './inventarios-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventariosDetallePageRoutingModule
  ],
  declarations: [InventariosDetallePage]
})
export class InventariosDetallePageModule {}
