import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NgModule } from '@angular/core';
import { OpcionesComponent } from './opciones/opciones.component';

@NgModule({
  declarations: [
    ErrorPageComponent,
    SidenavComponent,
    OpcionesComponent
  ],
  imports: [
    RouterModule, CommonModule
  ],
    exports:[
      ErrorPageComponent,
      SidenavComponent,
      OpcionesComponent
  ]
})
export class SharedModule { }
