import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BiomasCrearPage } from '../biomas-crear/biomas-crear.page';
import axios from 'axios';

@Component({
  selector: 'app-biomas-listado',
  templateUrl: './biomas-listado.page.html',
  styleUrls: ['./biomas-listado.page.scss'],
  standalone: false,
})
export class BiomasListadoPage implements OnInit {

  biomas: any = [];
  baseUrl: string = "http://localhost:8080/biomas";
  
  total: number = 0;
  page: number = 1;
  busqueda: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarTotal();
    this.cargarBiomas();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.page = 1; 
    this.cargarTotal();
    this.cargarBiomas();
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
      console.log("Total actualizado:", this.total);
    } catch (error) {
      console.log("Error cargando total:", error);
    }
  }

  async cargarBiomas() {
    let url: string = `${this.baseUrl}/buscar`;
    
    if(this.busqueda !== '') {
        url += "/" + this.busqueda;
    } else {
        url = `${this.baseUrl}?page=${this.page}`;
    }

    const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
    });
    await loading.present();

    try {
        const response = await axios({
            method: 'get',
            url: url,
            withCredentials: true,
            headers: { 'Accept': 'application/json' }
        });
        this.biomas = response.data;
    } catch (error) {
        console.log("Error en carga:", error);     
    }
    loading.dismiss();
  }

  pagina(event: any) {
    const seleccion = event.target.innerText;
    if (seleccion) {
      this.page = Number(seleccion);
      this.cargarBiomas();
      document.querySelector('ion-content')?.scrollToTop(500);
    }
  }

  async alertEliminar(id: string, nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Bioma',
      message: `¿Estás seguro de eliminar el bioma "${nombre}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Confirmar',
          handler: () => { this.eliminar(id); }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(id: string) {
    try {
      await axios({
        method: 'delete',
        url: `${this.baseUrl}/${id}`,
        withCredentials: true,
        headers: { 'Authorization': 'Bearer 100-token' }
      });
      this.cargarTotal();
      this.cargarBiomas();
    } catch (error) {
      console.log("Error al eliminar:", error);
    }
  }

  async new() {
    const paginaModal = await this.modalCtrl.create({
        component: BiomasCrearPage,
        initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then(() => {
      this.cargarTotal();
      this.cargarBiomas();
    });
  }

  async editar(id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: BiomasCrearPage,
      componentProps: { 'id': id },
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then(() => {
      this.cargarTotal();
      this.cargarBiomas();
    });
  }
}