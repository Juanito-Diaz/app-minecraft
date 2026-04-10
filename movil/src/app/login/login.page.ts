import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../services/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  login!: FormGroup;
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

  private buildForm() {
    this.login = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(3),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.required
      ])],
    });
  }

  async submitLogin() {
    localStorage.clear();
    const loginData = this.login?.value;
    try {
      this.loginService.login(loginData).subscribe(
        async response => {
          if (response?.status == 200 && response?.data !== '') {
            localStorage.setItem('token', response?.data);
            localStorage.setItem('sesion', 'login');
            localStorage.setItem('username', loginData.username);
            this.router.navigate(['/welcome']);
          } else if (response?.data === '') {
            this.alertError();
          }
        },
        error => {
          console.log(error);
          this.alertError();
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
      message: 'Nombre de usuario o contraseña incorrecta.',
      cssClass: 'alert-center',
      buttons: ['Corregir'],
    });
    await alert.present();
  }

  getError(controlName: string) {
    let errors: any[] = [];
    const control = this.login.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  registrar() {
    this.router.navigate(['/registro']);
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
