import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  // Arreglo de enlaces sincronizado con app-routing.module.ts
  enlaces: any = [
    { ruta: '/mundos-listado', texto: 'Mundos', icono: 'planet-outline' },
    { ruta: '/biomas-listado', texto: 'Biomas', icono: 'earth-outline' }, 
    { ruta: '/jugadores-listado', texto: 'Jugadores', icono: 'people-outline' },
    { ruta: '/mobs-listado', texto: 'Mobs', icono: 'bug-outline' },
    { ruta: '/inventarios-listado', texto: 'Inventarios', icono: 'briefcase-outline' },
    { ruta: '/items-listado', texto: 'Items', icono: 'diamond-outline' } // <-- AGREGADO
  ];

  constructor() {}
}