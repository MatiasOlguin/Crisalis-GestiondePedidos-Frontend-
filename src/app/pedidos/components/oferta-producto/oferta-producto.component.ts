import { PedidosService } from './../../pedidos.service';
import { StockComponent } from './../stock/stock.component';
import { Producto } from './../../../productos/producto';
import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { Item } from '../../interfaces/item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-oferta-producto',
  templateUrl: './oferta-producto.component.html',
  styleUrls: ['./oferta-producto.component.css'],
})
export class OfertaProductoComponent implements OnInit, OnDestroy {
  item!: Item;
  clicked!: boolean;
  sinStock!: boolean;
  @Input() producto!: Producto;
  @Output() onEnviarItem: EventEmitter<Item> = new EventEmitter();
  @ViewChild('hijo') hijo!: StockComponent;
  suscripcionActualizar: Subscription = new Subscription();

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.suscripcionActualizar = this.pedidosService.metodoLlamado$.subscribe(
      () => this.actualizar()
    );
    this.actualizar();
  }

  ngOnDestroy(): void {
    this.suscripcionActualizar.unsubscribe();
  }

  crearItem(): Item | undefined {
    if (this.hijo.stock !== 0 && this.producto.cantidad !== 0) {
      this.item = {
        producto: this.producto,
        servicio: null,
        adicional: null,
        aniosGarantia: null,
        cantidad: this.hijo.stock,
        subtotal: this.producto.montoBase * this.hijo.stock,
        iva: this.producto.montoBase * this.hijo.stock * 0.21,
        iibb: this.producto.montoBase * this.hijo.stock * 0.035,
        total:
          this.producto.montoBase * this.hijo.stock +
          this.producto.montoBase * this.hijo.stock * 0.21 +
          this.producto.montoBase * this.hijo.stock * 0.035,
      };
      this.clicked = true;

      if (this.producto.cantidad == this.hijo.stock) {
        this.sinStock = true;
        this.clicked = false;
      }
      console.log(this.item)
      this.hijo.reset();
      return this.item;
    } else {
      return;
    }
  }

  actualizar() {
    let aux = this.pedidosService.pedido.items.find(
      (item) => item.producto?.id == this.producto.id
    );

    if (this.producto.cantidad == 0) {
      this.sinStock = true;
    } else {
      this.sinStock = false;
    }

    if (aux != undefined) {
      this.clicked = true;
    } else {
      this.clicked = false;
    }
  }

  enviar() {
    this.onEnviarItem.emit(this.crearItem());
  }
}
