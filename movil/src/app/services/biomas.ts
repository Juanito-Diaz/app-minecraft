import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BiomasService {

  url: string = `http://localhost:8080/biomas`;
  
  // Headers tal cual al manual
  headers: any = {
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token'
  };

  constructor() { }

  listado(extra: string = '', busqueda: string = ''): Observable<any> {
    let url: string = busqueda === '' ? `${this.url}` + extra : `${this.url}/buscar/` + busqueda + extra;
    return new Observable(observer => {
      axios.get(url, { withCredentials: true, headers: this.headers })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  detalle(id: string | null = '', extra: string = ''): Observable<any> {
    const url = `${this.url}/` + id + extra;
    return new Observable(observer => {
      axios.get(url, { withCredentials: true, headers: this.headers })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  crear(bioma: any): Observable<any> {
    return new Observable(observer => {
      axios.post(this.url, bioma, { withCredentials: true, headers: this.headers })
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

  actualizar(id: string, bioma: any): Observable<any> {
    const url = `${this.url}/${id}`;
    return new Observable(observer => {
      axios.put(url, bioma, { withCredentials: true, headers: this.headers })
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

  eliminar(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return new Observable(observer => {
      axios.delete(url, { withCredentials: true, headers: this.headers })
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

  total(busqueda: string = ''): Observable<any> {
    const url = `${this.url}/total/` + busqueda;
    return new Observable(observer => {
      axios.get(url, { withCredentials: true, headers: this.headers })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }
}