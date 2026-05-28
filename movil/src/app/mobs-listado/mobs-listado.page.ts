import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { MobsCrearPage } from '../mobs-crear/mobs-crear.page';
import { Permiso } from '../services/permiso';
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
    private alertCtrl: AlertController,
    public permisoService: Permiso
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
    const isPlayer = localStorage.getItem('username') !== 'admin';
    if (isPlayer) {
      const loading = await this.loadingCtrl.create({ message: 'Cargando...' });
      await loading.present();
      
      try {
        const response = await axios({
          method: 'get',
          url: `${this.baseUrl}?todos=true`,
          withCredentials: true,
          headers: { 'Accept': 'application/json' }
        });
        const todosMobs = response.data;
        
        const resB = await axios({
          method: 'get',
          url: 'http://localhost:8080/biomas',
          withCredentials: true,
          headers: { 'Accept': 'application/json' }
        });
        const myBiomas = resB.data;
        
        loading.dismiss();
        
        if (myBiomas.length === 0) {
          const emptyAlert = await this.alertCtrl.create({
            header: 'Agregar Mob',
            message: 'Primero debes tener al menos un bioma en tus mundos.',
            buttons: ['OK']
          });
          await emptyAlert.present();
          return;
        }
        
        const inputsMob = todosMobs.map((m: any) => ({
          type: 'radio',
          label: `${m.nombre} (${m.tipo})`,
          value: m
        }));
        
        const alertMob = await this.alertCtrl.create({
          header: 'Selecciona un Mob',
          inputs: inputsMob,
          buttons: [
            { text: 'Cancelar', role: 'cancel' },
            {
              text: 'Siguiente',
              handler: async (selectedMob: any) => {
                if (selectedMob) {
                  const inputsBioma = myBiomas.map((b: any) => ({
                    type: 'radio',
                    label: b.nombre,
                    value: b.id
                  }));
                  const alertB = await this.alertCtrl.create({
                    header: 'Selecciona el Bioma',
                    message: `¿En qué bioma deseas añadir el mob ${selectedMob.nombre}?`,
                    inputs: inputsBioma,
                    buttons: [
                      { text: 'Cancelar', role: 'cancel' },
                      {
                        text: 'Agregar',
                        handler: async (biomaId: any) => {
                          if (biomaId) {
                            try {
                              await axios({
                                method: 'post',
                                url: this.baseUrl,
                                data: {
                                  nombre: selectedMob.nombre,
                                  tipo: selectedMob.tipo,
                                  es_hostil: selectedMob.es_hostil,
                                  id_bioma: biomaId
                                },
                                withCredentials: true
                              });
                              this.cargarTotal();
                              this.cargarMobs();
                            } catch (e) {
                              console.error("Error al clonar mob:", e);
                            }
                          }
                        }
                      }
                    ]
                  });
                  await alertB.present();
                  }
                }
              }
            ]
          });
          await alertMob.present();
        
      } catch (error) {
        loading.dismiss();
        console.error(error);
      }
    } else {
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