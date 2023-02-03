import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { HomeComponent } from './pages/home/home.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { ServiciosRoutingModule } from './servicios-routing.module';


@NgModule({
  declarations: [
    AgregarComponent,
    ServicioComponent,
    ListadoComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ServiciosModule { }
