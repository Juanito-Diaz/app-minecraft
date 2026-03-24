import { NgModule } from '@angular/core'; // <-- Debe ser 'import' con una sola 'i'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MobsListadoPageRoutingModule } from './mobs-listado-routing.module';
import { MobsListadoPage } from './mobs-listado.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobsListadoPageRoutingModule,
    ToolbarModule,
    PaginacionModule 
  ],
  declarations: [MobsListadoPage]
})
export class MobsListadoPageModule {}