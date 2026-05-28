import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Permiso {
  url: string = `${environment.apiUrl}permiso/`;

  constructor() { }

  private getHeaders(): any {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    };
  }

  permisos(): Observable<any> {
    const url = `${this.url}lista-permisos`;
    const token = localStorage.getItem('token');
    return new Observable(observer => {
      axios.get(`${url}?user=${token}`, {
        withCredentials: true,
        headers: this.getHeaders()
      })
      .then(response => {
        observer.next(response);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  has(vista: string): boolean {
    const username = localStorage.getItem('username');
    if (username === 'admin') {
      return true;
    }
    if (vista === 'mundos-eliminar') {
      return true;
    }
    const permisos = JSON.parse(localStorage.getItem('permisos') || '[]');
    return permisos.includes(vista);
  }
}
