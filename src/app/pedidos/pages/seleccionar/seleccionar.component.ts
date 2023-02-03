import { Router } from '@angular/router';
import { PedidosService } from './../../pedidos.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ClientesService } from 'src/app/clientes/clientes.service';
import { ClienteNombre } from 'src/app/pedidos/interfaces/clienteNombre';

@Component({
  selector: 'app-seleccionar',
  templateUrl: './seleccionar.component.html',
  styleUrls: ['./seleccionar.component.css']
})

export class SeleccionarComponent {
  clienteSeleccionado : ClienteNombre  = {
    id:0,
    nombreCompleto:''};
  clientes: ClienteNombre[] = [];

  constructor(
    private clientesService: ClientesService,
    private pedidosService: PedidosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientesService.getClientes().subscribe((clientes) => {
      clientes.forEach((cliente) => {
        let id = cliente.id;
        let nombreCompleto = cliente.nombre + ' ' + cliente.apellido;
        let clienteAux: ClienteNombre;

        this.clientes.push(
          (clienteAux = {
            id: id,
            nombreCompleto: nombreCompleto,
          })
        );
      });
    });
  }

  setCliente(){
    this.pedidosService.reiniciarPedido();
    this.pedidosService.pedido.cliente=this.clienteSeleccionado;
    this.router.navigate(['/pedidos/ver-items']);
  }
}
