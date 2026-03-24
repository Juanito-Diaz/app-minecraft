import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MundosListadoPageRoutingModule } from './mundos-listado-routing.module';
import { MundosListadoPage } from './mundos-listado.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';
import { MundosCrearPageModule } from '../mundos-crear/mundos-crear.module'; // <-- Importación añadida

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MundosListadoPageRoutingModule,
    ToolbarModule,
    PaginacionModule,
    MundosCrearPageModule
  ],
  declarations: [MundosListadoPage]
})
export class MundosListadoPageModule {}