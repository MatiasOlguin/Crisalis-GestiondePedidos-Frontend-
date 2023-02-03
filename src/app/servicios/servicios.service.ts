import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from './servicio';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  private apiUrl: string = 'http://localhost:8080/servicios';

  constructor(private http: HttpClient) {}

  getServicios() : Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrl);
  }

  getServicioPorId(id: number) : Observable<Servicio> {
    return this.http.get<Servicio>(`${ this.apiUrl }/${ id }`);
  }

  agregarServicio(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.apiUrl, servicio);
  }
  actualizarServicio(servicio: Servicio): Observable<Servicio>{
    let url = `${this.apiUrl}/${servicio.id}`;
    return this.http.put<Servicio>(url, servicio)
  }
  
  borrarServicio(id : number) : Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }
}
