import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InventariosListadoPageRoutingModule } from './inventarios-listado-routing.module';
import { InventariosListadoPage } from './inventarios-listado.page';

// IMPORTACIÓN DE COMPONENTES REUTILIZABLES
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventariosListadoPageRoutingModule,
    ToolbarModule,     // Inyectamos Toolbar
    PaginacionModule   // Inyectamos Paginación (Burbujas)
  ],
  declarations: [InventariosListadoPage]
})
export class InventariosListadoPageModule {}