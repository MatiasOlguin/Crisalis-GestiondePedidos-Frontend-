import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuario: Usuario = { username: '', password: '' };
  usuarioInvalido: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  registro(){
    this.authService.registro(this.usuario).subscribe({
      next:(resp) => {
        console.log(resp);
      },
      error: (e) => (this.usuarioInvalido = true),
      complete: () => {
        this.router.navigate(['/auth/login']);
      },
  })
  }
}
