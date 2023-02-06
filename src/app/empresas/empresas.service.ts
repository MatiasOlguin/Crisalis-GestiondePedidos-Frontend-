import { Cliente } from 'src/app/clientes/interfaces/cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from './empresa';

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  private apiUrl: string = 'http://localhost:8080/empresas';

  constructor(private http: HttpClient) {}


  getEmpresas() : Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.apiUrl);
  }

  getEmpresaPorId(id: number) : Observable<Empresa> {
    return this.http.get<Empresa>(`${ this.apiUrl }/${ id }`);
  }

  agregarEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.apiUrl, empresa);
  }

  agregarEmpleado(empleado : Cliente, id : number){
    return this.http.post<Empresa>(`${ this.apiUrl }/${ id }`, empleado);
  }

  actualizarEmpresa(empresa: Empresa): Observable<Empresa>{
    let url = `${this.apiUrl}/${empresa.id}`;
    return this.http.put<Empresa>(url, empresa)
  }
  
  borrarEmpresa(id : number) : Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }
}
