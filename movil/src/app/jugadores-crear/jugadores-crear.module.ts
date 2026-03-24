import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JugadoresCrearPageRoutingModule } from './jugadores-crear-routing.module';

import { JugadoresCrearPage } from './jugadores-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JugadoresCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [JugadoresCrearPage]
})
export class JugadoresCrearPageModule {}
