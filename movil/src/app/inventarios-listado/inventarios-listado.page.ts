import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { InventariosCrearPage } from '../inventarios-crear/inventarios-crear.page';
import axios from 'axios';

@Component({
  selector: 'app-inventarios-listado',
  templateUrl: './inventarios-listado.page.html',
  styleUrls: ['./inventarios-listado.page.scss'],
  standalone: false,
})
export class InventariosListadoPage implements OnInit {
  listaInventarios: any[] = [];
  baseUrl: string = 'http://localhost:8080/inventarios';
  
  total: number = 0;
  page: any = 1;
  busqueda: string = '';

  constructor(
    private modalController: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarTotal();
    this.obtenerInventarios();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.page = 1; 
    this.cargarTotal();
    this.obtenerInventarios();
  }

  async cargarTotal() {
    let url = `${this.baseUrl}/total`;
    if (this.busqueda !== '') {
      url += "/" + this.busqueda;
    }

    try {
      const response = await axios({
        method: 'get',
        url : url,
        withCredentials: true,
        headers: { 'Accept': 'application/json' }
      });
      this.total = 0;
      setTimeout(() => {
        this.total = Number(response.data);
        console.log("Total cargado:", this.total);
      }, 100);
    } catch (error) {
      console.log(error);     
    }
  }

  async obtenerInventarios() {
    let url: string = `${this.baseUrl}/buscar`;
    
    if(this.busqueda !== '') {
        url += "/" + this.busqueda + "?expand=jugador,item";
    } else {
        url = `${this.baseUrl}?page=${this.page}&expand=jugador,item`;
    }

    const loading = await this.loadingCtrl.create({
        message: 'Cargando Inventarios',
        spinner: 'bubbles', 
    });
    await loading.present();

    try {
      const res = await axios.get(url, { withCredentials: true });
      this.listaInventarios = res.data;
    } catch (error) {
      console.error("Error al obtener inventarios:", error);
    }
    loading.dismiss();
  }

  pagina(event: any) {
    const v = event.target.innerText;
    if(v) {
      this.page = v;
      this.obtenerInventarios();
      document.querySelector('ion-content')?.scrollToTop(500);
    }
  }

  irAlDetalle(id: number) {
    this.router.navigate(['/inventarios-detalle', id]);
  }

  async alertEliminar(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Inventario',
      subHeader: 'Confirmar eliminación',
      message: '¿Estás seguro de eliminar este registro?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => { this.eliminar(id); }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(id: number) {
    try {
      await axios.delete(`${this.baseUrl}/${id}`, { withCredentials: true });
      this.cargarTotal(); 
      this.obtenerInventarios();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  }

  // Modificado para asegurar que el modal refresque la lista al cerrar
  async abrirModalCrear(id: any = undefined) {
    const modal = await this.modalController.create({
      component: InventariosCrearPage,
      componentProps: { 'id': id, 'soloLectura': false },
      breakpoints: [0, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await modal.present();
    
    // Escuchamos el cierre del modal
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.cargarTotal();
      this.obtenerInventarios();
    }
  }
}