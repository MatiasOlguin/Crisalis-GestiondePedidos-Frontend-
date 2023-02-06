import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Pedido } from './interfaces/pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private apiUrl: string = 'http://localhost:8080/pedidos';
  private _subtotal: number = 0;
  private _total: number = 0;
  private _impuestos: number = 0;
  private _cargoSoporte: number = 0;
  private _garantia: number = 0;
  private _pedido: Pedido = {
    items: [],
    cliente: { id: 0 },
  };
  private _llamadaMetodo = new Subject();
  metodoLlamado$ = this._llamadaMetodo.asObservable();

  constructor(private http: HttpClient) {}

  llamarMetodo() {
    this._llamadaMetodo.next(true);
  }

  get pedido(): Pedido {
    return this._pedido;
  }

  set pedido(pedido: Pedido) {
    this._pedido = pedido;
  }

  get subtotal(): number {
    return this._subtotal;
  }

  set subtotal(subtotal: number) {
    this._subtotal = subtotal;
  }

  actualizarSubtotal() {
    this._subtotal = 0;
    for (let i = 0; i < this.pedido.items.length; i++) {
      if (this.pedido.items[i].producto) {
        this.pedido.items[i].subtotal =
          (this.pedido.items[i].producto?.montoBase || 0) *
          this.pedido.items[i].cantidad;
        this._subtotal += this.pedido.items[i].subtotal || 0;
      } else {
        this.pedido.items[i].subtotal =
          this.pedido.items[i].servicio?.montoBase || 0;
        this._subtotal += this.pedido.items[i].subtotal;
      }
    }
  }

  get total(): number {
    return this._total;
  }

  set total(total: number) {
    this._total = total;
  }

  actualizarTotal() {
    this._total = 0;
    for (let i = 0; i < this.pedido.items.length; i++) {
      this.pedido.items[i].total =
        (this.pedido.items[i].subtotal || 0) +
        (this.pedido.items[i].iva || 0) +
        (this.pedido.items[i].iibb || 0);

      if (this.pedido.items[i].adicional) {
        if (this.pedido.items[i].total) {
          this.pedido.items[i].total += this.pedido.items[i].adicional || 0;
        }
      }
      this._total += this.pedido.items[i].total;
    }
  }

  get impuestos(): number {
    return this._impuestos;
  }

  set impuestos(impuestos: number) {
    this._impuestos = impuestos;
  }

  actualizarImpuestos() {
    this._impuestos = 0;
    for (let i = 0; i < this.pedido.items.length; i++) {
      this.pedido.items[i].iva = (this.pedido.items[i].subtotal || 0) * 0.21;
      this.pedido.items[i].iibb = (this.pedido.items[i].subtotal || 0) * 0.035;
      this._impuestos +=
        (this.pedido.items[i].iva || 0) + (this.pedido.items[i].iibb || 0);
    }
  }

  get cargoSoporte(): number {
    return this._cargoSoporte;
  }

  set cargoSoporte(cargoSoporte: number) {
    this._cargoSoporte = cargoSoporte;
  }

  actualizarCargoSoporte() {
    this._cargoSoporte = 0;
    for (let i = 0; i < this.pedido.items.length; i++) {
      if (this.pedido.items[i].servicio && this.pedido.items[i].adicional != 0)
        this._cargoSoporte += this.pedido.items[i].adicional || 0;
    }
  }

  get garantia(): number {
    return this._garantia;
  }

  set garantia(garantia: number) {
    this._garantia = garantia;
  }

  actualizarGarantia() {
    this._garantia = 0;
    for (let i = 0; i < this.pedido.items.length; i++) {
      if (this.pedido.items[i].producto && this.pedido.items[i].adicional != 0)
        this._garantia += this.pedido.items[i].adicional || 0;
    }
  }

  actualizarValores() {
    this.actualizarSubtotal();
    this.actualizarImpuestos();
    this.actualizarCargoSoporte();
    this.actualizarGarantia();
    this.actualizarTotal();
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  getPedidoPorId(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  agregarPedido(): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, this._pedido);
  }

  actualizarEstado(id: number, estado : string) {
    return this.http.put<any>(`${this.apiUrl}/${id}/${estado}`, null);
  }

  borrarPedido(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  reiniciarPedido() {
    this._cargoSoporte = 0;
    this._garantia= 0;
    this._impuestos = 0;
    this._subtotal = 0;
    this._total = 0;
    this._pedido = {
      items: [],
      cliente: { id: 0 },
    };
  }
}
