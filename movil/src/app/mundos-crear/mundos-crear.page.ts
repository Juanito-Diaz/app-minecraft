import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { MundosService } from '../services/mundos';

@Component({
  selector: 'app-mundos-crear',
  templateUrl: './mundos-crear.page.html',
  standalone: false
})
export class MundosCrearPage implements OnInit {
  @Input() id_mundo: any; 
  public mundoForm!: FormGroup;

  dificultades = [
    { id: 'Pacífico', nombre: 'Pacífico' },
    { id: 'Fácil', nombre: 'Fácil' },
    { id: 'Normal', nombre: 'Normal' },
    { id: 'Difícil', nombre: 'Difícil' }
  ];

  constructor(
    private fb: FormBuilder, 
    private alert: AlertController, 
    private modalCtrl: ModalController,
    private mundosService: MundosService 
  ) {}

  ngOnInit() {
    this.formulario();
    if (this.id_mundo) { 
        this.getDetalle(); 
    }
  }

  private formulario() {
    this.mundoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      semilla: ['', [Validators.required]],
      dificultad: ['Normal', [Validators.required]]
    });
  }

  getDetalle() {
    this.mundosService.detalle(this.id_mundo).subscribe(
      (res: any) => {
        const datos = Array.isArray(res) ? res[0] : res;
        if (datos) {
          this.mundoForm.patchValue({
            nombre: datos.nombre,
            semilla: datos.semilla,
            dificultad: datos.dificultad
          });
        }
      },
      (error: any) => { console.error("Error al cargar detalle:", error); }
    );
  }

  async guardarDatos() {
    const p = this.id_mundo 
      ? this.mundosService.actualizar(this.id_mundo, this.mundoForm.value)
      : this.mundosService.crear(this.mundoForm.value);

    p.subscribe(
      () => { this.alertMsg('Éxito', 'Operación realizada correctamente.'); },
      (error) => { console.error("Error en operación:", error); }
    );
  }

  private async alertMsg(sub: string, msg: string) {
    const a = await this.alert.create({
      header: 'Mundos',
      subHeader: sub,
      message: msg,
      buttons: [{ text: 'Aceptar', handler: () => this.modalCtrl.dismiss() }]
    });
    await a.present();
  }

  cerrar() { this.modalCtrl.dismiss(); }
}