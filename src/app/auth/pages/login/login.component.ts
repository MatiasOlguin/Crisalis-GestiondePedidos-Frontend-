import { Router } from '@angular/router';
import { AuthService } from './../../auth.service';
import { Component } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usuario: Usuario = { id: 0, username: '', password: '' };
  usuarioInvalido: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.usuario).subscribe({
      next: (resp) => {
        localStorage.setItem('id', resp.id.toString());
      },
      error: (e) => {
        this.usuarioInvalido = true;
      },
      complete: () => {
        this.router.navigate(['/clientes/listado']);
      },
    });
  }
}
