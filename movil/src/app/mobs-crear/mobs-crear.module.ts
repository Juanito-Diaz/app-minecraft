import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobsCrearPageRoutingModule } from './mobs-crear-routing.module';

import { MobsCrearPage } from './mobs-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobsCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MobsCrearPage]
})
export class MobsCrearPageModule {}
