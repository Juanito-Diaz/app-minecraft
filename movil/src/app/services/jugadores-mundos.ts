import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class JugadoresMundosService {

  url: string = `http://localhost:8080/jugadores-mundos`;

  constructor() { }

  private getHeaders() {
    const token = localStorage.getItem('token') || '100-token';
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  listado(): Observable<any> {
    return new Observable(observer => {
      axios.get(this.url, {
        withCredentials: true,
        headers: this.getHeaders()
      })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
    });
  }

  crear(datos: any): Observable<any> {
    return new Observable(observer => {
      axios.post(this.url, datos, {
        withCredentials: true,
        headers: this.getHeaders()
      })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
    });
  }
}
