import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- ESTO SOLUCIONA EL NG8002
import { IonicModule } from '@ionic/angular';
import { PaginacionComponent } from './paginacion.component';

@NgModule({
  declarations: [PaginacionComponent],
  imports: [
    CommonModule, // <--- OBLIGATORIO AQUÍ
    IonicModule
  ],
  exports: [PaginacionComponent]
})
export class PaginacionModule {}