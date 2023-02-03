import { Servicio } from '../../servicio';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ServiciosService } from '../../servicios.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  servicio: Servicio = {
    id: 0,
    descripcion: '',
    montoBase: 0,
    tipo: '',
  };

  constructor(
    private serviciosService: ServiciosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.serviciosService.getServicioPorId(id)))
      .subscribe((servicio) => (this.servicio = servicio));
  }

  guardar() {
    if (this.servicio.id) {
      this.serviciosService
        .actualizarServicio(this.servicio)
        .subscribe((resp) => this.router.navigate(['/servicios/listado']));
    } else {
      this.serviciosService
        .agregarServicio(this.servicio)
        .subscribe((resp) => this.router.navigate(['/servicios/listado']));
    }
  }
}
