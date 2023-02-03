import { Producto } from './../../producto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductosService } from '../../productos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  producto: Producto = {
    id: 0,
    descripcion: '',
    montoBase: 0,
    marca: '',
    modelo: '',
    cantidad: 0,
  };

  constructor(
    private productosService: ProductosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.productosService.getProductoPorId(id)))
      .subscribe((producto) => (this.producto = producto));
  }

  guardar() {
    if (this.producto.id) {
      this.productosService
        .actualizarProducto(this.producto)
        .subscribe((resp) => this.router.navigate(['/productos/listado']));
    } else {
      this.productosService
        .agregarProducto(this.producto)
        .subscribe((resp) => this.router.navigate(['/productos/listado']));
    }
  }
}
