import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JugadoresDetallePageRoutingModule } from './jugadores-detalle-routing.module';

import { JugadoresDetallePage } from './jugadores-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JugadoresDetallePageRoutingModule
  ],
  declarations: [JugadoresDetallePage]
})
export class JugadoresDetallePageModule {}
