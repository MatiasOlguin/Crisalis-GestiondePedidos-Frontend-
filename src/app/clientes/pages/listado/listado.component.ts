import { ClientesService } from './../../clientes.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../cliente';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.clientesService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  borrar(id : any): void {
    this.clientesService.borrarCliente(id).subscribe((resp) =>
      this.clientesService.getClientes().subscribe((clientes) => {
        this.clientes = clientes;
      })
    );
  }
}
