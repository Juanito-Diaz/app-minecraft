import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-jugadores-crear',
  templateUrl: './jugadores-crear.page.html',
  standalone: false
})
export class JugadoresCrearPage implements OnInit {
  @Input() id_jugador: any;
  public jugadorForm!: FormGroup;
  baseUrl: string = "http://localhost:8080/jugadores";

  constructor(
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.formulario();
    if (this.id_jugador) { this.getDetalles(); }
  }

  private formulario() {
    this.jugadorForm = this.fb.group({
      username: ['', Validators.required],
      nivel_xp: [0, [Validators.required]],
      fecha_union: ['', Validators.required]
    });
  }

  async getDetalles() {
    try {
      const res = await axios.get(`${this.baseUrl}/${this.id_jugador}`);
      this.jugadorForm.patchValue(res.data);
    } catch (e) { console.log(e); }
  }

  async guardarDatos() {
    const esNuevo = !this.id_jugador;
    try {
      await axios({
        method: esNuevo ? 'post' : 'put',
        url: esNuevo ? this.baseUrl : `${this.baseUrl}/${this.id_jugador}`,
        data: this.jugadorForm.value,
        headers: { 'Authorization': 'Bearer 100-token' }
      });
      this.modalCtrl.dismiss(true); // Se envía true para refrescar lista
    } catch (e) { console.log(e); }
  }

  async alertEliminar(id: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Borrar registro permanentemente?',
      buttons: [
        { text: 'Cancelar' },
        { text: 'Borrar', handler: () => this.eliminar(id) }
      ]
    });
    await alert.present();
  }

  async eliminar(id: any) {
    try {
      await axios.delete(`${this.baseUrl}/${id}`, {
        headers: { 'Authorization': 'Bearer 100-token' }
      });
      this.modalCtrl.dismiss().then(() => {
        window.location.reload(); 
      });
    } catch (e) { console.log(e); }
  }

  cerrar() { this.modalCtrl.dismiss(); }
}