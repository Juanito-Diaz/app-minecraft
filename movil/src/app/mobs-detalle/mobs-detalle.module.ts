import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobsDetallePageRoutingModule } from './mobs-detalle-routing.module';

import { MobsDetallePage } from './mobs-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobsDetallePageRoutingModule
  ],
  declarations: [MobsDetallePage]
})
export class MobsDetallePageModule {}
