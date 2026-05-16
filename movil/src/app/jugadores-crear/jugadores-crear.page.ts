import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';
import { MundosService } from '../services/mundos';
import { JugadoresMundosService } from '../services/jugadores-mundos';

@Component({
  selector: 'app-jugadores-crear',
  templateUrl: './jugadores-crear.page.html',
  standalone: false
})
export class JugadoresCrearPage implements OnInit {
  @Input() id_jugador: any;
  public jugadorForm!: FormGroup;
  baseUrl: string = "http://localhost:8080/jugadores";

  public mundos: any[] = [];
  public mundosCargados = false;
  archivoSeleccionado: any;

  constructor(
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private router: Router,
    private mundosService: MundosService,
    private jugadoresMundosService: JugadoresMundosService
  ) {}

  ngOnInit() {
    this.formulario();
    this.cargarMundos();
    if (this.id_jugador) { this.getDetalles(); }
  }

  private formulario() {
    this.jugadorForm = this.fb.group({
      username: ['', Validators.required],
      nivel_xp: [0, [Validators.required]],
      fecha_union: ['', Validators.required],
      mundos: this.fb.array([])
    });
  }

  get mundosFA(): FormArray {
    return this.jugadorForm.get('mundos') as FormArray;
  }

  agregarMundo() {
    this.mundosFA.push(new FormControl(null, Validators.required));
  }

  eliminarMundo(index: number) {
    this.mundosFA.removeAt(index);
  }

  async cargarMundos() {
    try {
      this.mundosService.listado('?per-page=100').subscribe(
        (response: any) => {
          this.mundos = response;
          this.mundosCargados = true;
        },
        (error: any) => {
          console.error('Error mundos:', error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  private guardarMundos(id_jugador: number) {
    const mundosSeleccionados: number[] = this.mundosFA.value.filter((id: any) => id != null && id !== '');

    if (!mundosSeleccionados.length) {
      return;
    }

    mundosSeleccionados.forEach(mundoId => {
      this.jugadoresMundosService.crear({
        id_jugador: id_jugador,
        id_mundo: mundoId
      }).subscribe(
        resp => console.log('Mundo guardado', resp),
        err  => console.error('Error guardando mundo', err)
      );
    });
  }

  async getDetalles() {
    try {
      const res = await axios.get(`${this.baseUrl}/${this.id_jugador}?expand=mundos`);
      
      this.jugadorForm.patchValue({
        username: res.data.username,
        nivel_xp: res.data.nivel_xp,
        fecha_union: res.data.fecha_union
      });

      if (res.data.mundos && res.data.mundos.length > 0) {
        this.mundosFA.clear();
        res.data.mundos.forEach((mundo: any) => {
          this.mundosFA.push(this.fb.control(mundo.id, Validators.required));
        });
      }
    } catch (e) { console.log(e); }
  }

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.archivoSeleccionado = file;
    }
  }

  async subirFoto(id: number | undefined) {
    if (!this.archivoSeleccionado || !id) return;
    
    const formData = new FormData();
    formData.append('foto', this.archivoSeleccionado);
    try {
      await axios({
        method: 'post',
        url: this.baseUrl + '/subir-foto/' + id,
        data: formData,
        headers: {
          'Authorization': 'Bearer 100-token'
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async guardarDatos() {
    const esNuevo = !this.id_jugador;
    try {
      const response = await axios({
        method: esNuevo ? 'post' : 'put',
        url: esNuevo ? this.baseUrl : `${this.baseUrl}/${this.id_jugador}`,
        data: this.jugadorForm.value,
        headers: { 'Authorization': 'Bearer 100-token' }
      });
      
      const idJugador = esNuevo ? response.data.id : this.id_jugador;
      if (idJugador) {
        this.guardarMundos(idJugador);
        await this.subirFoto(idJugador);
      }
      
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