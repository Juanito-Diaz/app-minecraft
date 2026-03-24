import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JugadoresListadoPageRoutingModule } from './jugadores-listado-routing.module';
import { JugadoresListadoPage } from './jugadores-listado.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JugadoresListadoPageRoutingModule,
    ToolbarModule,
    PaginacionModule
  ],
  declarations: [JugadoresListadoPage]
})
export class JugadoresListadoPageModule {}
