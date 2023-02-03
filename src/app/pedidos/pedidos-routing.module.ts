import { VerItemsComponent } from './pages/ver-items/ver-items.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { SeleccionarComponent } from './pages/seleccionar/seleccionar.component';

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
        path:'seleccionar-cliente',
        component:SeleccionarComponent
      },
      {
        path:'ver-items',
        component:VerItemsComponent
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
export class PedidosRoutingModule {}
