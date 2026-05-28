import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { MundosService } from '../services/mundos';
import { JugadoresMundosService } from '../services/jugadores-mundos';

@Component({
  selector: 'app-mundos-crear',
  templateUrl: './mundos-crear.page.html',
  standalone: false
})
export class MundosCrearPage implements OnInit {
  @Input() id_mundo: any; 
  public mundoForm!: FormGroup;
  isPlayer: boolean = true;
  todosMundos: any[] = [];
  selectedMundoId: any = '';

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
    private mundosService: MundosService,
    private jugadoresMundosService: JugadoresMundosService
  ) {}

  ngOnInit() {
    const permisos = JSON.parse(localStorage.getItem('permisos') || '[]');
    this.isPlayer = !permisos.includes('jugadores-listado');
    this.formulario();
    
    if (this.id_mundo) { 
        this.getDetalle(); 
    } else if (this.isPlayer) {
        this.cargarMundosParaUnirse();
    }
  }

  private cargarMundosParaUnirse() {
    this.mundosService.listado('?todos=true').subscribe(
      (todos: any) => {
        this.mundosService.listado().subscribe(
          (misMundos: any) => {
            this.todosMundos = todos.filter((m: any) => !misMundos.some((my: any) => my.id === m.id));
          },
          (err) => console.error("Error al cargar mundos propios:", err)
        );
      },
      (err) => console.error("Error al cargar todos los mundos:", err)
    );
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
    if (this.isPlayer && !this.id_mundo) {
      if (!this.selectedMundoId) {
        this.alertMsg('Error', 'Debes seleccionar un mundo.');
        return;
      }
      this.jugadoresMundosService.crear({ id_mundo: this.selectedMundoId }).subscribe(
        () => { 
          this.alertMsg('Éxito', 'Te has unido al mundo correctamente.'); 
        },
        (error) => { 
          console.error("Error al unirse al mundo:", error);
          this.alertMsg('Error', 'No se pudo unir al mundo.');
        }
      );
      return;
    }

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
      buttons: [{ text: 'Aceptar', handler: () => this.modalCtrl.dismiss(true) }]
    });
    await a.present();
  }

  cerrar() { this.modalCtrl.dismiss(); }
}