import { Component, OnInit } from '@angular/core';
import { Producto } from '../../producto';
import { ProductosService } from '../../productos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  borrar(id: number): void {
    this.productosService.borrarProducto(id).subscribe((resp) =>
      this.productosService.getProductos().subscribe((productos) => {
        this.productos = productos;
      })
    );
  }
}
