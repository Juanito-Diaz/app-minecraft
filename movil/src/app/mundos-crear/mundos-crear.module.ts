import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MundosCrearPageRoutingModule } from './mundos-crear-routing.module';
import { MundosCrearPage } from './mundos-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MundosCrearPageRoutingModule,
    ReactiveFormsModule //
  ],
  declarations: [MundosCrearPage] // Asegúrate que diga MundosCrearPage
})
export class MundosCrearPageModule {}