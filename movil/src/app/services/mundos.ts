import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MundosService {

  url: string = `http://localhost:8080/mundos`;

  constructor() { }

  // Función privada para obtener los headers actualizados en cada llamada
  private getHeaders() {
    const token = localStorage.getItem('token') || '100-token'; // Prioriza token real, usa el de prueba por defecto
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  // Listado de elementos
  listado(extra: string = '', busqueda: string = ''): Observable<any> {
    let url: string = busqueda === '' 
      ? `${this.url}${extra}` 
      : `${this.url}/buscar/${busqueda}${extra}`;

    return new Observable(observer => {
      axios.get(url, {
        withCredentials: true,
        headers: this.getHeaders() // Llamada dinámica
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

  // Detalle de un elemento
  detalle(id: string | null = '', extra: string = ''): Observable<any> {
    const url = `${this.url}/${id}${extra}`;
    return new Observable(observer => {
      axios.get(url, {
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

  // Crear un elemento
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

  // Actualizar un elemento
  actualizar(id: string, datos: any): Observable<any> {
    const url = `${this.url}/${id}`;
    return new Observable(observer => {
      axios.put(url, datos, {
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

  // Eliminar un elemento
  eliminar(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return new Observable(observer => {
      axios.delete(url, {
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

  // Contar el total de elementos
  total(busqueda: string = ''): Observable<any> {
    const url = busqueda === '' 
      ? `${this.url}/total` 
      : `${this.url}/total/${busqueda}`;

    return new Observable(observer => {
      axios.get(url, {
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