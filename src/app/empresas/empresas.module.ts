import { EmpresasRoutingModule } from './empresas-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AgregarComponent,
    EmpresaComponent,
    ListadoComponent,
    BuscarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class EmpresasModule { }
