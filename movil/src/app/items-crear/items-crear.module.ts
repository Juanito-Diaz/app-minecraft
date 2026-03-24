import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- IMPORTANTE: Agregar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';
import { ItemsCrearPageRoutingModule } from './items-crear-routing.module';
import { ItemsCrearPage } from './items-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // <-- IMPORTANTE: Agregar aquí también
    IonicModule,
    ItemsCrearPageRoutingModule
  ],
  declarations: [ItemsCrearPage]
})
export class ItemsCrearPageModule {}