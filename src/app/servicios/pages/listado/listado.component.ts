import { Component, OnInit } from '@angular/core';
import { Servicio } from '../../servicio';
import { ServiciosService } from '../../servicios.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  servicios: Servicio[] = [];

  constructor(private serviciosService: ServiciosService) {}

  ngOnInit(): void {
    this.serviciosService.getServicios().subscribe((servicios) => {
      this.servicios = servicios;
    });
  }

  borrar(id: any): void {
    this.serviciosService.borrarServicio(id).subscribe((resp) =>
      this.serviciosService.getServicios().subscribe((servicios) => {
        this.servicios = servicios;
      })
    );
  }
}
