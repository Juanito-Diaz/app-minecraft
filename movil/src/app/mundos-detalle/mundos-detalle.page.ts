import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MundosService } from '../services/mundos';

@Component({
  selector: 'app-mundos-detalle',
  templateUrl: './mundos-detalle.page.html',
  styleUrls: ['./mundos-detalle.page.scss'],
  standalone: false,
})
export class MundosDetallePage implements OnInit {

  mundo: any = {
    biomas: [],
    jugadors: []
  };

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private mundosService: MundosService
  ) { }

  ngOnInit() {
    this.cargarMundo();
  }

  async cargarMundo() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const loading = await this.loadingCtrl.create({
      message: 'Cargando dimensiones...',
      spinner: 'crescent'
    });
    await loading.present();

    // Usamos el servicio con el parámetro expand
    const query = `?expand=biomas,jugadors`;
    
    this.mundosService.detalle(id + query).subscribe(
      (res: any) => {
        this.mundo = res;
        console.log("👤 Mundo completo con relaciones:", this.mundo);
        loading.dismiss();
      },
      (error) => {
        console.error("Error al conectar con el servidor:", error);
        loading.dismiss();
      }
    );
  }
}