import { EmpresasService } from './../../empresas.service';

import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../empresa';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  empresas: Empresa[] = [];

  constructor(private empresasService: EmpresasService) {}

  ngOnInit(): void {
    this.empresasService.getEmpresas().subscribe((empresas) => {
      this.empresas = empresas;
    });
  }

  borrar(id: number): void {
    this.empresasService.borrarEmpresa(id).subscribe((resp) =>
      this.empresasService.getEmpresas().subscribe((empresas) => {
        this.empresas = empresas;
      })
    );
  }
}
