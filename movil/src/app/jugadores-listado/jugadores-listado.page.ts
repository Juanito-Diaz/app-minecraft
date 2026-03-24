import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { JugadoresCrearPage } from '../jugadores-crear/jugadores-crear.page';
import axios from 'axios';

@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.page.html',
  styleUrls: ['./jugadores-listado.page.scss'],
  standalone: false
})
export class JugadoresListadoPage implements OnInit {
  jugadores: any = [];
  baseUrl: string = "http://localhost:8080/jugadores";
  
  total: number = 0;
  page: any = 1;
  busqueda: string = '';

  constructor(
    private modalCtrl: ModalController, 
    private loading: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() { 
    this.cargarTotal();
    this.cargarJugadores(); 
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.page = 1; 
    this.cargarTotal();
    this.cargarJugadores();
  }

  async cargarTotal() {
    let url = `${this.baseUrl}/total`;
    if (this.busqueda !== '') {
      url += "/" + this.busqueda;
    }

    try {
      const response = await axios({
        method: 'get',
        url: url,
        withCredentials: true,
        headers: { 'Accept': 'application/json' }
      });
      this.total = Number(response.data);
      console.log("¡Total cargado!", this.total);
    } catch (error) {
      console.error("Error al obtener total:", error);
    }
  }

  async cargarJugadores() {
    let url: string = `${this.baseUrl}/buscar`;
    
    if (this.busqueda !== '') {
        url += "/" + this.busqueda;
    } else {
        url = `${this.baseUrl}?page=${this.page}`;
    }

    const l = await this.loading.create({ 
      message: 'Cargando jugadores...', 
      spinner: 'bubbles'
    });
    await l.present();
    
    try {
      const res = await axios({
        method: 'get',
        url: url,
        withCredentials: true,
        headers: { 'Accept': 'application/json' }
      });
      this.jugadores = res.data;
    } catch (e) { 
      console.error("Error en la petición:", e); 
    }
    l.dismiss();
  }

  pagina(event: any) {
    const valor = event.target.innerText;
    if (valor) {
      this.page = Number(valor);
      this.cargarJugadores();
      document.querySelector('ion-content')?.scrollToTop(500);
    }
  }

  async editar(id: number) {
    const modal = await this.modalCtrl.create({
      component: JugadoresCrearPage,
      componentProps: { 'id_jugador': id },
      initialBreakpoint: 0.95
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.cargarTotal();
      this.cargarJugadores();
    });
  }

  async alertEliminar(id: any, username: string) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Jugador',
      message: `¿Estás seguro de eliminar a ${username}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Eliminar', 
          role: 'destructive',
          handler: () => { this.eliminar(id); } 
        }
      ]
    });
    await alert.present();
  }

  async eliminar(id: any) {
    try {
      await axios({
        method: 'delete',
        url: `${this.baseUrl}/${id}`,
        withCredentials: true,
        headers: { 'Authorization': 'Bearer 100-token' }
      });
      this.cargarTotal();
      this.cargarJugadores(); 
    } catch (e) { 
      console.error("Error al eliminar:", e); 
    }
  }

  async nuevo() {
    const modal = await this.modalCtrl.create({ 
      component: JugadoresCrearPage,
      initialBreakpoint: 0.95
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.cargarTotal();
      this.cargarJugadores();
    });
  }
}