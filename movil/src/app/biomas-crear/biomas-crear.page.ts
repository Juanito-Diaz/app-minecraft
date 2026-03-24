import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-biomas-crear',
  templateUrl: './biomas-crear.page.html',
  standalone: false,
})
export class BiomasCrearPage implements OnInit {

  @Input() id: number | undefined;

  baseUrl: string = "http://localhost:8080/biomas";
  mundosUrl: string = "http://localhost:8080/mundos";
  public bioma!: FormGroup;
  public mundos: any = [];
  private editarDatos: any = [];

  mensajes_validacion: any = {
    'nombre': [{ type: 'required', message: 'El nombre es obligatorio.' }],
    'temperatura': [
      { type: 'required', message: 'La temperatura es obligatoria.' },
      { type: 'min', message: 'Mínimo permitido: -1.0' },
      { type: 'max', message: 'Máximo permitido: 2.0' }
    ],
    'id_mundo': [{ type: 'required', message: 'Debes seleccionar un mundo.' }]
  };

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.cargarMundos();
    this.formulario();
    if (this.id !== undefined) {
      this.getDetalles();
    }
  }

  async cargarMundos() {
    try {
      const res = await axios.get(this.mundosUrl);
      this.mundos = res.data;
    } catch (e) { console.log(e); }
  }

  private formulario() {
    this.bioma = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      temperatura: ['', [Validators.required, Validators.min(-1), Validators.max(2)]],
      id_mundo: ['', [Validators.required]]
    });
  }

  async getDetalles() {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.id}`);
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.bioma.get(String(key));
        if (control) {
          control.markAsTouched();
          control.patchValue(this.editarDatos[key]);
        }
      });
    } catch (e) { console.log(e); }
  }

  async guardarDatos() {
    try {
      const biomaData = this.bioma.value;
      const esNuevo = this.id === undefined;
      const metodo = esNuevo ? 'post' : 'put';
      const url = esNuevo ? this.baseUrl : `${this.baseUrl}/${this.id}`;

      await axios({
        method: metodo,
        url: url,
        data: biomaData,
        headers: { 'Authorization': 'Bearer 100-token' }
      });

      const alert = await this.alert.create({
        header: 'Éxito',
        message: 'Se ha guardado exitosamente',
        buttons: [{ text: 'OK', handler: () => this.modalCtrl.dismiss(true) }]
      });
      await alert.present();

    } catch (error: any) {
      console.log(error);
    }
  }

  cerrar() { this.modalCtrl.dismiss(); }
}