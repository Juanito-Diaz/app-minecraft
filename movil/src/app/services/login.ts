import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url: string = `${environment.apiUrl}jugadores/`;
  headers: any = { 'Content-Type': 'application/json' };

  constructor() {}

  login(dataLogin: any): Observable<any> {
    const url = `${this.url}login`;
    return new Observable((observer) => {
      axios
        .post(url, dataLogin, {
          withCredentials: true,
          headers: this.headers,
        })
        .then((response) => {
          observer.next(response);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  registrar(dataRegistrar: any): Observable<any> {
    const url = `${this.url}registrar`;
    return new Observable((observer) => {
      axios
        .post(url, dataRegistrar, {
          withCredentials: true,
          headers: this.headers,
        })
        .then((response) => {
          observer.next(response);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
          observer.complete();
        });
    });
  }
}
