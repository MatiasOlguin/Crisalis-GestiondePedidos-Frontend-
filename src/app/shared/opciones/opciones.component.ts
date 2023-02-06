import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css'],
})
export class OpcionesComponent {
  @Input() link: string = '';

  constructor(private authService : AuthService, private router : Router){}

  logout(){
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
