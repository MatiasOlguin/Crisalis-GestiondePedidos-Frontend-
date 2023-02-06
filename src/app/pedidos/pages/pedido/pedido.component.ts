import { PedidosService } from '../../pedidos.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Pedido } from '../../interfaces/pedido';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class PedidoComponent implements OnInit {
  pedido!: Pedido;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pedidosService: PedidosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.pedidosService.getPedidoPorId(id)))
      .subscribe((pedido) => (this.pedido = pedido));
  }

  eliminar() {
    this.pedidosService
      .borrarPedido(this.pedido.id || 0)
      .subscribe((resp) => this.router.navigate(['pedidos/listado']));
  }
}
