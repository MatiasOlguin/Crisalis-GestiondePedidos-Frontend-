import { ClientesService } from './../../clientes.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    dni: '',
    servicios:[]
  };

  constructor(
    private clientesService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.clientesService.getClientePorId(id)))
      .subscribe((cliente) => (this.cliente = cliente));
  }

  guardar() {
    if (this.cliente.id) {
      this.clientesService
        .actualizarCliente(this.cliente)
        .subscribe(resp =>  this.router.navigate(['/clientes/listado']));
    }
    else {
      this.clientesService
        .agregarCliente(this.cliente)
        .subscribe(resp => this.router.navigate(['/clientes/listado']));
    }
  }
}
