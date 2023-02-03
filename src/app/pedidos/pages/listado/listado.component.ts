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

  borrar(id : any): void {
    this.pedidosService.borrarPedido(id).subscribe((resp) =>
      this.pedidosService.getPedidos().subscribe((pedidos) => {
        this.pedidos = pedidos;
      })
    );
  }
}
