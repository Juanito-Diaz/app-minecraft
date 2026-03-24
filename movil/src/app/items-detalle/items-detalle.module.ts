import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItemsDetallePageRoutingModule } from './items-detalle-routing.module';
import { ItemsDetallePage } from './items-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemsDetallePageRoutingModule
  ],
  declarations: [ItemsDetallePage]
})
export class ItemsDetallePageModule {}