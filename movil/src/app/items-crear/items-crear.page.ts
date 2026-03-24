import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { ItemsService } from '../services/items';

@Component({
  selector: 'app-items-crear',
  templateUrl: './items-crear.page.html',
  standalone: false,
})
export class ItemsCrearPage implements OnInit {
  @Input() id: any; 
  @Input() soloLectura: boolean = false; // Esta es la propiedad que faltaba

  public itemForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private itemsService: ItemsService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.initFormulario();
    if (this.id !== undefined) {
      this.getDetalles();
    }
  }

  private initFormulario() {
    this.itemForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      puntos_ataque: [0, [Validators.required]],
      es_apilable: [0, [Validators.required]]
    });
  }

  getDetalles() {
    this.itemsService.detalle(this.id).subscribe(
      res => { 
        this.itemForm.patchValue(res); 
        // Si entramos en modo solo lectura, deshabilitamos el formulario
        if (this.soloLectura) {
          this.itemForm.disable();
        }
      },
      err => { console.error("Error cargando detalles:", err); }
    );
  }

  async guardarDatos() {
    // Si por alguna razón se intenta guardar en solo lectura, no hacer nada
    if (this.soloLectura) return;

    try {
      const item = this.itemForm.value;
      if (this.id === undefined) {
        this.itemsService.crear(item).subscribe(
          response => {
            if (response?.status == 201) {
              this.alertMsg('Éxito', 'Item registrado correctamente');
              this.modalCtrl.dismiss(true);
            }
          },
          error => { console.error(error); }
        );
      } else {
        this.itemsService.actualizar(this.id, item).subscribe(
          response => {
            if (response?.status == 200) {
              this.alertMsg('Éxito', 'Item actualizado correctamente');
              this.modalCtrl.dismiss(true);
            }
          },
          error => { console.error(error); }
        );
      }
    } catch (e) { console.log(e); }
  }

  private async alertMsg(h: string, m: string) {
    const a = await this.alertCtrl.create({ header: h, message: m, buttons: ['OK'] });
    await a.present();
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}