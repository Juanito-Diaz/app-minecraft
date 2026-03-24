import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-jugadores-detalle',
  templateUrl: './jugadores-detalle.page.html',
  styleUrls: ['./jugadores-detalle.page.scss'],
  standalone: false,
})
export class JugadoresDetallePage implements OnInit {

  jugador: any = null;
  baseUrl: string = "http://localhost:8080/jugadores";

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.cargarJugador();
  }

  async cargarJugador() {
    const id = this.route.snapshot.paramMap.get('id');
    const loading = await this.loadingCtrl.create({
      message: 'Cargando perfil de usuario...',
      spinner: 'dots'
    });
    await loading.present();

    try {
      // Expand multinivel: Inventarios -> Item, y relación con Mundos
      const url = `${this.baseUrl}/${id}?expand=inventarios.item,mundos&t=${new Date().getTime()}`;
      const response = await axios.get(url);
      this.jugador = response.data;
      console.log("👤 Perfil completo:", this.jugador);
    } catch (error) {
      console.error("Error al cargar jugador:", error);
    } finally {
      loading.dismiss();
    }
  }
}