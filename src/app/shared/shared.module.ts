import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    ErrorPageComponent,
    SidenavComponent
  ],
  imports: [
    RouterModule, CommonModule
  ],
    exports:[
      ErrorPageComponent,
      SidenavComponent
  ]
})
export class SharedModule { }
