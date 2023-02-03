import { PedidosService } from '../../pedidos.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Pedido } from '../../interfaces/pedido';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class EmpresaComponent implements OnInit {
  verPedido!: Pedido;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pedidosService: PedidosService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.pedidosService.getPedidoPorId(id)))
      .subscribe((pedido) => (this.verPedido = pedido));
  }
}
