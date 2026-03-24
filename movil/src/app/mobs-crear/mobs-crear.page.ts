import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; 
import axios from 'axios';

@Component({
  selector: 'app-mobs-crear',
  templateUrl: './mobs-crear.page.html',
  standalone: false,
})
export class MobsCrearPage implements OnInit {

  @Input() id: any | undefined;

  baseUrl: string = "http://localhost:8080/mobs";
  biomasUrl: string = "http://localhost:8080/biomas";
  public mob!: FormGroup;
  biomas: any = [];

  opcionesHostil = [
    {'id': 1, 'label': 'Sí (Hostil)'},
    {'id': 0, 'label': 'No (Pasivo)'}
  ];

  mensajes_validacion: any = {
    'tipo': [{ type: 'required', message: 'Tipo requerido.' }],
    'es_hostil': [{ type: 'required', message: 'Hostilidad requerida.' }],
    'id_bioma': [{ type: 'required', message: 'Bioma requerido.' }]
  };

  constructor(
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private router: Router
  ) { }

  async ngOnInit() {
    this.formulario();
    await this.cargarBiomas();
    if (this.id !== undefined) {
        await this.getDetalles();
    }
  }

  async cargarBiomas() {
    try {
      const response = await axios.get(this.biomasUrl);
      this.biomas = response.data;
    } catch (error) { console.error(error); }
  }

  private formulario() {
    this.mob = this.formBuilder.group({
      tipo: ['', [Validators.required]],
      es_hostil: ['', [Validators.required]],
      id_bioma: ['', [Validators.required]]
    });
  }

  async getDetalles() {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.id}`);
      const editarDatos = response.data;
      this.mob.patchValue({
        tipo: editarDatos.tipo,
        es_hostil: editarDatos.es_hostil,
        id_bioma: editarDatos.id_bioma
      });
    } catch (error) { console.error(error); }
  }

  async guardarDatos() {
    try {
      const datosMob = this.mob?.value;
      if (this.id === undefined) {
          const response = await axios.post(this.baseUrl, datosMob, {
            headers: { 'Authorization': 'Bearer 100-token' }
          });
          if (response?.status == 201 || response?.status == 200) this.alertGuardado('Configuración guardada.');
      } else {
          const response = await axios.put(`${this.baseUrl}/${this.id}`, datosMob, {
            headers: { 'Authorization': 'Bearer 100-token' }
          });
          if (response?.status == 200) this.alertGuardado('Configuración actualizada.');
      }
    } catch (error: any) {
        console.error(error);
    }
  }

  async alertEliminar(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Mobs',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar el Mob con ID ' + id + '?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Confirmar', handler: () => { this.eliminar(id); } }
      ]
    });
    await alert.present();
  }

  async eliminar(id: string) {
    try {
      const response = await axios.delete(this.baseUrl + '/' + id, {
        withCredentials: true,
        headers: { 'Authorization': 'Bearer 100-token' }
      });
      if (response?.status == 204 || response?.status == 200) {
        this.alertEliminado(id, 'El mob ha sido eliminado correctamente.');
      }
    } catch (error) { console.error(error); }
  }

  async alertEliminado(id: string, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Mobs',
      message: msg,
      buttons: [
        { text: 'Continuar', role: 'cancel' },
        { text: 'Salir', handler: () => { this.regresar(); } },
      ],
    });
    await alert.present();
  }

  private regresar() {
    this.modalCtrl.dismiss(true).then(() => {
        this.router.navigate(['/mobs-listado']).then(() => {
            window.location.reload();
        });
    });
  }

  private async alertGuardado(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Mobs',
      message: msg,
      buttons: [{ text: 'ACEPTAR', handler: () => { this.modalCtrl.dismiss(true); } }],
    });
    await alert.present();
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.mob.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }
}