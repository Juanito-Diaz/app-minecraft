import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Permiso } from './services/permiso';

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
    if (!token) {
      return [];
    }
    return this.enlaces.filter((enlace: any) => {
      const vista = enlace.ruta.substring(1);
      return this.permisoService.has(vista);
    });
  }

  constructor(private router: Router, public permisoService: Permiso) {
    // Interceptor global de Axios para inyectar el token de Authorization
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/', { replaceUrl : true });
  }
}