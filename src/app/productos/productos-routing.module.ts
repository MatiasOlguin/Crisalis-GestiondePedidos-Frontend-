import { HomeComponent } from './pages/home/home.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent,
    children: [
      {
        path:'listado',
        component:ListadoComponent
      },
      {
        path:'agregar',
        component:AgregarComponent
      },
      {
        path:'editar/:id',
        component:AgregarComponent
      },
      {
        path:'buscar',
        component:BuscarComponent
      },
      {
        path:':id',
        component:ProductoComponent
      },
      {
        path:'**',
        redirectTo:'listado'
      }
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ProductosRoutingModule {}
