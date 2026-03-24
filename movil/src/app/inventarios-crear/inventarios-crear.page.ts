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
    await this.cargarCatalogos();
    if (this.id !== undefined) {
      await this.getDetalles();
    }
  }

  async cargarCatalogos() {
    try {
      const resJ = await axios.get('http://localhost:8080/jugadores');
      const resI = await axios.get('http://localhost:8080/items');
      this.listaJugadores = resJ.data;
      this.listaItems = resI.data;
    } catch (error) { console.error(error); }
  }

  async getDetalles() {
    try {
      const res = await axios.get(`http://localhost:8080/inventarios/${this.id}?expand=jugador,item`);
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
      let response;

      if (this.id === undefined) {
        response = await axios.post(url, this.formulario);
        if (response.status === 201 || response.status === 200) {
          this.alertSuccess('Registro Creado', 'La asignación de inventario se guardó correctamente.');
        }
      } else {
        response = await axios.put(`${url}/${this.id}`, this.formulario);
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