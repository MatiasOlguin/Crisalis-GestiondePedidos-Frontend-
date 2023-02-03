import { ClientesRoutingModule } from './clientes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AgregarComponent,
    ClienteComponent,
    ListadoComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ClientesModule { }
