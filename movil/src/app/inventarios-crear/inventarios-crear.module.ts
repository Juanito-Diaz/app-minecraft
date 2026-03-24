import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InventariosCrearPageRoutingModule } from './inventarios-crear-routing.module';
import { InventariosCrearPage } from './inventarios-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventariosCrearPageRoutingModule,
    InventariosCrearPage // <--- Se importa aquí porque es standalone
  ],
  declarations: [] // <--- VACÍO: No se declara aquí
})
export class InventariosCrearPageModule {}