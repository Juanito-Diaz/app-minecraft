import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { MobsCrearPage } from '../mobs-crear/mobs-crear.page';
import axios from 'axios';

@Component({
  selector: 'app-mobs-listado',
  templateUrl: './mobs-listado.page.html',
  styleUrls: ['./mobs-listado.page.scss'],
  standalone: false,
})
export class MobsListadoPage implements OnInit {

  mobs: any = [];
  baseUrl: string = "http://localhost:8080/mobs";
  
  total: number = 0;
  page: number = 1;
  busqueda: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.cargarTotal();
    this.cargarMobs();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.page = 1; 
    this.cargarTotal();
    this.cargarMobs();
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
      
      this.total = 0;
      setTimeout(() => {
        this.total = Number(response.data);
        console.log("Total cargado con éxito:", this.total);
      }, 100);

    } catch (error) {
      console.error("Error cargando total:", error);
    }
  }

  async cargarMobs() {
    let url: string = `${this.baseUrl}/buscar`;
    
    if (this.busqueda !== '') {
        url += "/" + this.busqueda + "?expand=bioma";
    } else {
        url = `${this.baseUrl}?page=${this.page}&expand=bioma`;
    }

    const l = await this.loadingCtrl.create({ 
      message: 'Sincronizando Bestiario...',
      spinner: 'bubbles' 
    });
    await l.present();

    try {
      const response = await axios({
        method: 'get',
        url: url,
        withCredentials: true,
        headers: { 'Accept': 'application/json' }
      });
      this.mobs = response.data;
    } catch (error) {
      console.error("Error al cargar mobs:", error);
    }
    l.dismiss();
  }

  pagina(event: any) {
    const seleccion = event.target.innerText;
    if (seleccion) {
      this.page = Number(seleccion);
      this.cargarMobs();
      document.querySelector('ion-content')?.scrollToTop(500);
    }
  }

  async new() {
    const modal = await this.modalCtrl.create({
        component: MobsCrearPage,
        initialBreakpoint: 0.95
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.cargarTotal();
      this.cargarMobs();
    });
  }

  async editar(id: number) {
    const modal = await this.modalCtrl.create({
      component: MobsCrearPage,
      componentProps: { 'id': id },
      initialBreakpoint: 0.95
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.cargarTotal();
      this.cargarMobs();
    });
  }

  async alertEliminar(id: any) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Mob',
      message: '¿Estás seguro de borrar el registro #' + id + '?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', handler: () => { this.eliminar(id); } }
      ]
    });
    await alert.present();
  }

  async eliminar(id: any) {
    try {
      const response = await axios({
        method: 'delete',
        url: `${this.baseUrl}/${id}`,
        withCredentials: true,
        headers: { 'Authorization': 'Bearer 100-token' }
      });
      
      if (response.status == 204 || response.status == 200) {
        this.cargarTotal();
        this.cargarMobs();
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  }
}