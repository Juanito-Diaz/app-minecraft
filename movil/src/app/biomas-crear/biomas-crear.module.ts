import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiomasCrearPageRoutingModule } from './biomas-crear-routing.module';

import { BiomasCrearPage } from './biomas-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiomasCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BiomasCrearPage]
})
export class BiomasCrearPageModule {}
