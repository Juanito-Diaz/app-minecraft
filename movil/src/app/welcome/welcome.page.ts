import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: false,
})
export class WelcomePage implements OnInit {

  enlaces: any = [
    { ruta: '/mundos-listado', texto: 'Mundos', icono: 'planet-outline' },
    { ruta: '/biomas-listado', texto: 'Biomas', icono: 'earth-outline' }, 
    { ruta: '/jugadores-listado', texto: 'Jugadores', icono: 'people-outline' },
    { ruta: '/mobs-listado', texto: 'Mobs', icono: 'bug-outline' },
    { ruta: '/inventarios-listado', texto: 'Inventarios', icono: 'briefcase-outline' },
    { ruta: '/items-listado', texto: 'Items', icono: 'diamond-outline' }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

}
