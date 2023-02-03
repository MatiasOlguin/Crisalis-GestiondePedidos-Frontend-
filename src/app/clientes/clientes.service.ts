import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private apiUrl: string = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) {}


  getClientes() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getClientePorId(id: number) : Observable<Cliente> {
    return this.http.get<Cliente>(`${ this.apiUrl }/${ id }`);
  }

  agregarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  actualizarCliente(cliente: Cliente): Observable<Cliente>{
    let url = `${this.apiUrl}/${cliente.id}`;
    return this.http.put<Cliente>(url, cliente)
  }
  
  borrarCliente(id: number) : Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }
}
