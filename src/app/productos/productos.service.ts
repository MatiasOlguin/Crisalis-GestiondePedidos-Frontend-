import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl: string = 'http://localhost:8080/productos';

  constructor(private http: HttpClient) {}

  getProductos() : Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getProductoPorId(id: number) : Observable<Producto> {
    return this.http.get<Producto>(`${ this.apiUrl }/${ id }`);
  }

  agregarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }
  actualizarProducto(producto: Producto): Observable<Producto>{
    let url = `${this.apiUrl}/${producto.id}`;
    return this.http.put<Producto>(url, producto)
  }
  
  borrarProducto(id : number) : Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }
}
