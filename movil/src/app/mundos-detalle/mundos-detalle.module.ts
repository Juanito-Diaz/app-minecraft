import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Importante para quitar errores de ion-header, etc.
import { MundosDetallePageRoutingModule } from './mundos-detalle-routing.module';
import { MundosDetallePage } from './mundos-detalle.page'; // Verifica la 's'
import { ToolbarModule } from '../components/toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // Esto habilita los componentes de Ionic
    MundosDetallePageRoutingModule,
    ToolbarModule
  ],
  declarations: [MundosDetallePage] // Debe coincidir con el export class del .ts
})
export class MundosDetallePageModule {}