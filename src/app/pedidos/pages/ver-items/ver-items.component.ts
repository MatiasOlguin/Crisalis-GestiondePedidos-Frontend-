import { Router } from '@angular/router';
import { Item } from './../../interfaces/item';
import { ServiciosService } from './../../../servicios/servicios.service';
import { Producto } from './../../../productos/producto';
import { Servicio } from './../../../servicios/servicio';
import { ProductosService } from './../../../productos/productos.service';
import { PedidosService } from './../../pedidos.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ItemComponent } from '../../components/item/item.component';

@Component({
  selector: 'app-ver-items',
  templateUrl: './ver-items.component.html',
  styleUrls: ['./ver-items.component.css'],
})
export class VerItemsComponent implements OnInit {
  productos: Producto[] = [];
  servicios: Servicio[] = [];
  showProductos: boolean = true;
  showServicios: boolean = false;
  @ViewChildren(ItemComponent) itemComponents!: QueryList<ItemComponent>;

  constructor(
    private pedidosService: PedidosService,
    private productosService: ProductosService,
    private serviciosService: ServiciosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productosService
      .getProductos()
      .subscribe((resp) => (this.productos = resp));

    this.serviciosService
      .getServicios()
      .subscribe((resp) => (this.servicios = resp));

    if (this.pedidosService.pedido.cliente.id == 0) {
      this.router.navigate(['pedidos/seleccionar-cliente']);
    }
  }

  llamarActualizar() {
    this.pedidosService.llamarMetodo();
  }

  getPedido() {
    return this.pedidosService.pedido;
  }

  getTotal() {
    return this.pedidosService.total;
  }

  getSubtotal() {
    return this.pedidosService.subtotal;
  }

  getImpuestos() {
    return this.pedidosService.impuestos;
  }

  getCargoSoporte() {
    return this.pedidosService.cargoSoporte;
  }

  getGarantia() {
    return this.pedidosService.garantia;
  }

  clickProductos() {
    this.showProductos = true;
    this.showServicios = false;
  }

  clickServicios() {
    this.showProductos = false;
    this.showServicios = true;
  }

  actualizarResultadoGarantia(){
    this.itemComponents.forEach(itemComponent => {
      if(itemComponent.showGarantia)
        itemComponent.mostrarGarantia();
    })
  }

  agregarItem(nuevoItem: Item): void {
    if (nuevoItem !== undefined) {
      if (nuevoItem.producto) {
        let item: any = this.pedidosService.pedido.items.find(
          (item) =>
            item.producto?.id == nuevoItem.producto?.id &&
            item.adicional == null
        );
        let producto = this.productos.find(
          (producto) => producto.id == nuevoItem.producto?.id
        );
        if (item) {
          item.cantidad += nuevoItem.cantidad;
          producto!.cantidad -= nuevoItem.cantidad;
          this.actualizarResultadoGarantia();
        } else {
          this.pedidosService.pedido.items.push(nuevoItem);
          let producto = this.productos.find(
            (producto) => producto.id == nuevoItem.producto?.id
          );
          producto!.cantidad -= nuevoItem.cantidad;
        }
      } else {
        this.pedidosService.pedido.items.push(nuevoItem);
      }
      this.pedidosService.actualizarValores();
      
      console.log(this.pedidosService.pedido.items);
    }
  }

  eliminarItem(itemAEliminar: Item) {
    this.pedidosService.pedido.items = this.pedidosService.pedido.items.filter(
      (item) => JSON.stringify(item) !== JSON.stringify(itemAEliminar)
    );

    if (itemAEliminar.producto) {
      let producto = this.productos.find(
        (producto) => producto.id == itemAEliminar.producto?.id
      );

      if (producto) producto.cantidad += itemAEliminar.cantidad;
    }

    this.llamarActualizar();
    this.pedidosService.actualizarValores();
    console.log(this.pedidosService.pedido.items.length);
  }

  enviarPedido() {
    console.log(this.pedidosService.pedido);
    if (this.pedidosService.pedido.items.length !== 0) {
      this.pedidosService.agregarPedido().subscribe((resp) => {
        console.log(resp);
        this.router.navigate(['/pedidos/listado']);
        this.pedidosService.reiniciarPedido();
      });
    }
  }
}
