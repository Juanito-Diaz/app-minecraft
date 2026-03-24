import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ItemsService } from '../services/items';

@Component({
  selector: 'app-items-detalle',
  templateUrl: './items-detalle.page.html',
  styleUrls: ['./items-detalle.page.scss'],
  standalone: false,
})
export class ItemsDetallePage implements OnInit {

  item: any = null;

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private itemsService: ItemsService // Inyectamos el servicio
  ) { }

  ngOnInit() {
    this.cargarItem();
  }

  async cargarItem() {
    const id = this.route.snapshot.paramMap.get('id');
    
    const loading = await this.loadingCtrl.create({
      message: 'Consultando el Codex...',
      spinner: 'lines-sharp'
    });
    await loading.present();

    try {
      // 1. Usamos el servicio en lugar de axios directo
      // 2. Pasamos el expand para traer inventarios y los datos del jugador
      const query = '?expand=inventarios.jugador';
      
      this.itemsService.detalle(id, query).subscribe(
        (response: any) => {
          this.item = response;
          console.log("Datos del item con relaciones:", this.item);
          loading.dismiss();
        },
        (error) => {
          console.error("Error al cargar detalle:", error);
          loading.dismiss();
        }
      );
    } catch (error) {
      console.error("Error inesperado:", error);
      loading.dismiss();
    }
  }
}