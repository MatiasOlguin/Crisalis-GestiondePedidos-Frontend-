import { Usuario } from './interfaces/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  verificaAutenticacion(): boolean {
    if (!localStorage.getItem('id')) {
      return false;
    } else {
      return true;
    }
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, usuario);
  }

  registro(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registro`, usuario);
  }

  logout(){
    localStorage.removeItem('id');
  }
}
