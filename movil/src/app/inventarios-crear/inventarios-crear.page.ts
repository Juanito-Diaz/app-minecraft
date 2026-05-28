import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-inventarios-crear',
  templateUrl: './inventarios-crear.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InventariosCrearPage implements OnInit {
  @Input() id: number | undefined;
  @Input() soloLectura: boolean = false;

  listaJugadores: any[] = [];
  listaItems: any[] = [];
  isPlayer: boolean = true;
  
  formulario: any = {
    id_jugador: '',
    id_item: '',
    cantidad: 1,
    id_jugador_nombre: '',
    id_item_nombre: ''
  };

  constructor(
    private modalController: ModalController,
    private alertCtrl: AlertController 
  ) {}

  async ngOnInit() {
    const permisos = JSON.parse(localStorage.getItem('permisos') || '[]');
    this.isPlayer = !permisos.includes('jugadores-listado');
    await this.cargarCatalogos();
    if (this.id !== undefined) {
      await this.getDetalles();
    }
  }

  private getHeaders() {
    const token = localStorage.getItem('token') || '100-token';
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  async cargarCatalogos() {
    try {
      const headers = this.getHeaders();
      const resJ = await axios.get('http://localhost:8080/jugadores', { headers });
      const resI = await axios.get('http://localhost:8080/items', { headers });
      this.listaJugadores = resJ.data;
      this.listaItems = resI.data;

      // Auto-set player ID if new record and user is a player
      if (this.id === undefined && this.isPlayer) {
        const username = localStorage.getItem('username');
        const currentPlayer = this.listaJugadores.find(
          j => j.username?.toLowerCase() === username?.toLowerCase()
        );
        if (currentPlayer) {
          this.formulario.id_jugador = currentPlayer.id;
        }
      }
    } catch (error) { console.error(error); }
  }

  async getDetalles() {
    try {
      const headers = this.getHeaders();
      const res = await axios.get(`http://localhost:8080/inventarios/${this.id}?expand=jugador,item`, { headers });
      const data = res.data;
      this.formulario = {
        id_jugador: data.id_jugador,
        id_item: data.id_item,
        cantidad: data.cantidad,
        id_jugador_nombre: data.jugador?.username || data.jugador?.nombre,
        id_item_nombre: data.item?.nombre
      };
    } catch (error) { console.error(error); }
  }

  async guardarDatos() {
    try {
      const url = 'http://localhost:8080/inventarios';
      const headers = this.getHeaders();
      let response;

      if (this.id === undefined) {
        response = await axios.post(url, this.formulario, { headers });
        if (response.status === 201 || response.status === 200) {
          this.alertSuccess('Registro Creado', 'La asignación de inventario se guardó correctamente.');
        }
      } else {
        response = await axios.put(`${url}/${this.id}`, this.formulario, { headers });
        if (response.status === 200) {
          this.alertSuccess('Registro Actualizado', 'Los cambios se aplicaron correctamente.');
        }
      }
    } catch (e) {
      console.error(e);
      this.alertError('Error', 'No se pudo procesar la solicitud.');
    }
  }

  async alertSuccess(header: string, msg: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: msg,
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.modalController.dismiss(true); 
        }
      }]
    });
    await alert.present();
  }

  async alertError(header: string, msg: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  cerrar() { this.modalController.dismiss(); }
}