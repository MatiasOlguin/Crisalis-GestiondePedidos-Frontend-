import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes=[
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path:'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesModule)
  },
  {
    path:'empresas',
    loadChildren: () => import('./empresas/empresas.module').then( m => m.EmpresasModule)
  },
  {
    path:'productos',
    loadChildren: () => import('./productos/productos.module').then( m => m.ProductosModule)
  },
  {
    path:'servicios',
    loadChildren: () => import('./servicios/servicios.module').then( m => m.ServiciosModule)
  },
  {
    path:'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosModule)
  },
  {
    path:'404',
    component: ErrorPageComponent
  },
  {
    path:'**',
    redirectTo:'auth'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }