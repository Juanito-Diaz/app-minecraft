import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { ItemsService } from '../services/items';
import { ItemsCrearPage } from '../items-crear/items-crear.page';

@Component({
  selector: 'app-items-listado',
  templateUrl: './items-listado.page.html',
  styleUrls: ['./items-listado.page.scss'],
  standalone: false
})
export class ItemsListadoPage implements OnInit {

  items: any = [];
  total: number = 0; // Se cambió de totalItems a total
  page: number = 1;
  busqueda: string = '';

  constructor(
    private itemsService: ItemsService,
    private loading: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.cargarItems();
  }

  async cargarItems() {
    const loading = await this.loading.create({
      message: 'Cargando items...',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      const extra = `?page=${this.page}&fields=id,nombre,es_apilable,puntos_ataque`;
      this.itemsService.listado(extra, this.busqueda).subscribe(
        response => {
          this.items = response;
          this.cargarTotal();
        },
        error => { console.error('Error:', error); }
      );
    } catch (error) { console.log(error); }
    loading.dismiss();
  }

  async cargarTotal() {
    try {
      this.itemsService.total(this.busqueda).subscribe(
        response => { this.total = response; }, // Se cambió a total
        error => { console.error('Error:', error); }
      );
    } catch (error) { console.log(error); }
  }

  // --- MÉTODOS QUE TU HTML ESTÁ PIDIENDO ---

  handleInput(event: any) {
    this.busqueda = event.target.value;
    this.page = 1;
    this.cargarItems();
  }

  // Antes se llamaba 'editar' o 'nuevo', ahora es abrirFormulario
  async abrirFormulario(id?: any) {
    const modal = await this.modalCtrl.create({
      component: ItemsCrearPage,
      componentProps: { id: id } // Enviamos el ID si existe (editar), si no, es nuevo
    });
    await modal.present();
    modal.onDidDismiss().then((res) => { 
      if (res.data) this.cargarItems(); 
    });
  }

  // Antes se llamaba 'navegar', ahora es irAlDetalle
  irAlDetalle(id: any) {
    this.navCtrl.navigateForward(['/items-detalle', id]);
  }

  async alertEliminar(id: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Deseas eliminar este item?',
      buttons: [
        { text: 'No' },
        { 
          text: 'Sí', 
          handler: () => {
            this.itemsService.eliminar(id).subscribe(
              () => {
                this.alertMsg('Eliminado', 'El item ha sido borrado.');
                this.cargarItems();
              },
              err => console.error(err)
            );
          } 
        }
      ]
    });
    await alert.present();
  }

  pagina(event: any) {
    this.page = Number(event.target.innerText);
    this.cargarItems();
  }

  private async alertMsg(h: string, m: string) {
    const a = await this.alertCtrl.create({ header: h, message: m, buttons: ['OK'] });
    await a.present();
  }
}