import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../services/login';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage implements OnInit {
  public registro!: FormGroup;
  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye!: ElementRef;
  passwordTypeInput = 'password';

  validation_messages: any = {
    'username': [
      { type: 'required', message: 'Usuario requerido.' },
      { type: 'minlength', message: 'Usuario debe contener al menos 3 caracteres.' },
      { type: 'maxlength', message: 'Usuario no puede contener más de 50 caracteres.' },
    ],
    'password': [
      { type: 'required', message: 'Contraseña requerida.' },
      { type: 'minlength', message: 'Contraseña debe contener al menos 8 caracteres.' },
      { type: 'maxlength', message: 'Contraseña no puede contener más de 15 caracteres.' },
      { type: 'pattern', message: 'Dígita una contraseña valida (Mínimo un número, una mayúscula, una minúscula y un caracter especial)' },
    ],
    'password_confirm': [
      { type: 'required', message: 'Contraseña requerida.' },
      { type: 'notEquivalent', message: 'No coinciden las contraseñas' },
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertCtrl: AlertController,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registro = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(3),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.maxLength(15),
        Validators.minLength(8),
        Validators.pattern("^(?=.*[-!#$%&/()?¡_])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,15}$"),
        Validators.required
      ])],
      password_confirm: ['', Validators.required]
    }, { validator: this.checkIfMatchingPasswords('password', 'password_confirm') });
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  async submitRegistrar() {
    localStorage.clear();
    const registrarData = this.registro?.value;
    try {
      this.loginService.registrar(registrarData).subscribe(
        async response => {
          if (response?.status == 200 && response?.data !== '') {
            localStorage.setItem('token', response?.data);
            localStorage.setItem('sesion', 'login');
            localStorage.setItem('username', registrarData.username);
            this.router.navigate(['/welcome']);
          } else if (response?.data === '') {
            this.alertError();
          }
        },
        error => {
          if (error.response?.status == 422) {
            this.alertDuplicado();
          } else {
            console.log(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertError() {
    const alert = await this.alertCtrl.create({
      header: 'Importante',
      subHeader: 'Error',
      message: 'Revise sus datos e intente de nuevo.',
      cssClass: 'alert-center',
      buttons: ['Corregir'],
    });
    await alert.present();
  }

  async alertDuplicado() {
    const alert = await this.alertCtrl.create({
      header: 'Importante',
      subHeader: 'Duplicado',
      message: 'El nombre de usuario ya se encuentra registrado o los datos son inválidos.',
      cssClass: 'alert-center',
      buttons: ['Corregir'],
    });
    await alert.present();
  }

  getError(controlName: string) {
    let errors: any[] = [];
    const control = this.registro.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  login() {
    this.router.navigate(['/login']);
  }

  togglePasswordMode(e: Event) {
    e.preventDefault();
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    if (nativeEl) {
      const inputSelection = nativeEl.selectionStart;
      nativeEl.focus();
      setTimeout(() => {
        nativeEl.setSelectionRange(inputSelection, inputSelection);
      }, 1);
    }
  }
}
