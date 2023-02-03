import { EmpresasService } from './../../empresas.service';

import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../empresa';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  empresa: Empresa = {
    id: 0,
    razonSocial: '',
    inicioActividades: '',
    cuit: '',
    createAt: '',
    empleados: [],
  };

  constructor(
    private empresasService: EmpresasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.empresasService.getEmpresaPorId(id)))
      .subscribe((empresa) => (this.empresa = empresa));
  }

  guardar() {
    if (this.empresa.id) {
      this.empresasService
        .actualizarEmpresa(this.empresa)
        .subscribe((resp) => this.router.navigate(['/empresas/listado']));
    } else {
      this.empresasService
        .agregarEmpresa(this.empresa)
        .subscribe((resp) => this.router.navigate(['/empresas/listado']));
    }
  }
}
