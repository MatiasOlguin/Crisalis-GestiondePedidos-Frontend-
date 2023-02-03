import { ClientesService } from './../../clientes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Cliente } from '../../cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit{
  verCliente !: Cliente;

  constructor( private activatedRoute : ActivatedRoute,
    private clientesService : ClientesService){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.clientesService.getClientePorId(id))
    )
    .subscribe( cliente => this.verCliente=cliente);
  }
}
