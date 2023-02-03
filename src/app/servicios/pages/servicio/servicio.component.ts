import { Servicio } from '../../servicio';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ServiciosService } from '../../servicios.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css'],
})
export class ServicioComponent implements OnInit {
  verServicio!: Servicio;

  constructor(
    private activatedRoute: ActivatedRoute,
    private serviciosService: ServiciosService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.serviciosService.getServicioPorId(id)))
      .subscribe((servicio) => (this.verServicio = servicio));
  }
}
