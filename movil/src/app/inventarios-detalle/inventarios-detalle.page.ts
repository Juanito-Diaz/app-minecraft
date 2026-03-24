import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-inventarios-detalle',
  templateUrl: './inventarios-detalle.page.html',
  styleUrls: ['./inventarios-detalle.page.scss'],
  standalone: false,
})
export class InventariosDetallePage implements OnInit {

  registro: any = null;
  baseUrl: string = "http://localhost:8080/inventarios";

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.cargarRegistro();
  }

  async cargarRegistro() {
    const id = this.route.snapshot.paramMap.get('id');
    
    const loading = await this.loadingCtrl.create({
      message: 'Consultando inventario...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      const response = await axios.get(`${this.baseUrl}/${id}?expand=item,jugador`);
      this.registro = response.data;
      console.log("📦 Datos del item:", this.registro.item);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      loading.dismiss();
    }
  }
}