import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { MundosCrearPage } from '../mundos-crear/mundos-crear.page';
import { MundosService } from '../services/mundos'; 

@Component({
  selector: 'app-mundos-listado',
  templateUrl: './mundos-listado.page.html',
  styleUrls: ['./mundos-listado.page.scss'],
  standalone: false
})
export class MundosListadoPage implements OnInit {
  mundos: any = [];
  total: number = 0;
  page: any = 1;
  busqueda: string = '';

  constructor(
    private modalCtrl: ModalController, 
    private loading: LoadingController,
    private alertCtrl: AlertController,
    private mundosService: MundosService 
  ) {}

  ngOnInit() { 
    this.cargarMundos(); 
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.page = 1; 
    this.cargarMundos();
  }

  async cargarTotal() {
    this.mundosService.total(this.busqueda).subscribe(
      (response: any) => {
        this.total = response;
      },
      (error: any) => {
        console.error('Error al cargar total:', error);
      }
    );
  }

  async cargarMundos() {
    const loader = await this.loading.create({
      message: 'Cargando mundos...',
      spinner: 'bubbles',
    });
    await loader.present();

    this.mundosService.listado('?page=' + this.page, this.busqueda).subscribe(
      (response: any) => {
        this.mundos = response;
        this.cargarTotal();
        loader.dismiss();
      },
      (error: any) => {
        console.error('Error al cargar listado:', error);
        loader.dismiss();
      }
    );
  }

  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarMundos();
    document.querySelector('ion-content')?.scrollToTop(500);
  }

  async new() {
    const modal = await this.modalCtrl.create({
      component: MundosCrearPage,
      initialBreakpoint: 0.95,
      breakpoints: [0, 0.95]
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.cargarMundos();
    });
  }

  // ACCIÓN 1: LUPA (Visualizar) - Cambiado a m.id
  async view(id: number) {
    const modal = await this.modalCtrl.create({
      component: MundosCrearPage,
      componentProps: { 'id_mundo': id } 
    });
    await modal.present();
  }

  // ACCIÓN 2: LÁPIZ (Editar) - Cambiado a m.id
  async edit(id: number) {
    const modal = await this.modalCtrl.create({
      component: MundosCrearPage,
      componentProps: { 'id_mundo': id }
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.cargarMundos();
    });
  }

  // ACCIÓN 3: BASURA (Eliminar) - Cambiado a id
  async eliminarMundo(id: any, nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Realmente deseas borrar el mundo: ${nombre}?`,
      buttons: [
        { text: 'No, cancelar', role: 'cancel' },
        {
          text: 'Sí, borrar',
          handler: () => {
            this.mundosService.eliminar(id).subscribe(
              (response: any) => {
                this.cargarMundos();
              },
              (error: any) => {
                console.error('Error al eliminar:', error);
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }
}