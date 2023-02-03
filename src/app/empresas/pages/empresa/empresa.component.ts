import { EmpresasService } from './../../empresas.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Empresa } from '../../empresa';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit{
  verEmpresa !: Empresa;

  constructor( private activatedRoute : ActivatedRoute,
    private empresasService : EmpresasService){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.empresasService.getEmpresaPorId(id))
    )
    .subscribe( empresa => this.verEmpresa=empresa);
  }
}
