import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProductosRoutingModule } from './productos-routing.module';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductoComponent } from './pages/producto/producto.component';


@NgModule({
  declarations: [
    AgregarComponent,
    ProductoComponent,
    ListadoComponent,
    BuscarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ProductosModule { }
