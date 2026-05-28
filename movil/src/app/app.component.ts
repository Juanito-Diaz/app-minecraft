import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  get enlacesFiltrados() {
    const token = localStorage.getItem('token');
    const permisosStr = localStorage.getItem('permisos');
    
    if (!token || !permisosStr) {
      return [];
    }
    
    try {
      const permisos = JSON.parse(permisosStr);
      return this.enlaces.filter((enlace: any) => {
        // Quita la primera barra '/' de la ruta para compararla con el permiso
        const vista = enlace.ruta.substring(1);
        return permisos.includes(vista);
      });
    } catch (e) {
      console.error('Error al analizar permisos en el menú lateral:', e);
      return [];
    }
  }

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/', { replaceUrl : true });
  }
}