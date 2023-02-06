import { AuthGuard } from './auth/guards/auth.guard';
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
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesModule),
    canActivate:[AuthGuard], canMatch:[AuthGuard]
  },
  {
    path:'empresas',
    loadChildren: () => import('./empresas/empresas.module').then( m => m.EmpresasModule),
    canActivate:[AuthGuard], canMatch:[AuthGuard]
  },
  {
    path:'productos',
    loadChildren: () => import('./productos/productos.module').then( m => m.ProductosModule),
    canActivate:[AuthGuard], canMatch:[AuthGuard]
  },
  {
    path:'servicios',
    loadChildren: () => import('./servicios/servicios.module').then( m => m.ServiciosModule),
    canActivate:[AuthGuard], canMatch:[AuthGuard]
  },
  {
    path:'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosModule),
    canActivate:[AuthGuard], canMatch:[AuthGuard]
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