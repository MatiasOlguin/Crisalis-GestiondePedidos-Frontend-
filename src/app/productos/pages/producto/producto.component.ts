import { Producto } from '../../producto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductosService } from '../../productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit{
  verProducto !: Producto;

  constructor( private activatedRoute : ActivatedRoute,
    private productosService : ProductosService){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.productosService.getProductoPorId(id))
    )
    .subscribe( producto => this.verProducto=producto);
  }
}
