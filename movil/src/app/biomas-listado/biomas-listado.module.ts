import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BiomasListadoPageRoutingModule } from './biomas-listado-routing.module';
import { BiomasListadoPage } from './biomas-listado.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiomasListadoPageRoutingModule,
    ToolbarModule,
    PaginacionModule
  ],
  declarations: [BiomasListadoPage]
})
export class BiomasListadoPageModule {}
