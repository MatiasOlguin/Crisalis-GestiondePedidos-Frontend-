import { PedidosService } from '../../pedidos.service';

import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../interfaces/pedido';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.pedidosService.getPedidos().subscribe((pedidos) => {
      this.pedidos = pedidos;
    });
  }

  cancelar(id : any): void {
    this.pedidosService.actualizarEstado(id,'CANCELADO').subscribe((resp) =>
      this.pedidosService.getPedidos().subscribe((pedidos) => {
        this.pedidos = pedidos;
      })
    );
  }

  aceptar(id : any): void {
    this.pedidosService.actualizarEstado(id,'ACEPTADO').subscribe((resp) =>
      this.pedidosService.getPedidos().subscribe((pedidos) => {
        this.pedidos = pedidos;
      })
    );
  }
}
