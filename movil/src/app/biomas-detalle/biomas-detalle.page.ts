import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-biomas-detalle',
  templateUrl: './biomas-detalle.page.html',
  styleUrls: ['./biomas-detalle.page.scss'],
  standalone: false,
})
export class BiomasDetallePage implements OnInit { // <-- CLASE CORREGIDA AQUÍ

  // VITAL: Inicializar con null para que el *ngIf espere a la carga real
  bioma: any = null;
  
  baseUrl: string = "http://localhost:8080/biomas";

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.cargarBioma();
  }

  async cargarBioma() {
    const id = this.route.snapshot.paramMap.get('id');
    
    const loading = await this.loadingCtrl.create({
      message: 'Analizando ecosistema...',
      spinner: 'dots'
    });
    await loading.present();

    try {
      // Agregamos un timestamp para evitar caché
      const response = await axios.get(`${this.baseUrl}/${id}?expand=mobs,mundo&t=${new Date().getTime()}`);
      
      // Asignamos los datos
      this.bioma = response.data;
      
      console.log("🔥 Datos recibidos en Ionic:", this.bioma);
      console.log("👾 Mobs detectados:", this.bioma.mobs);

    } catch (error) {
      console.error("❌ Error al cargar bioma:", error);
    } finally {
      loading.dismiss();
    }
  }
}