import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItemsListadoPageRoutingModule } from './items-listado-routing.module';
import { ItemsListadoPage } from './items-listado.page'; 
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module'; // <-- IMPORTANTE

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemsListadoPageRoutingModule,
    ToolbarModule,
    PaginacionModule // <-- INYECTAR AQUÍ
  ],
  declarations: [ItemsListadoPage]
})
export class ItemsListadoPageModule {}