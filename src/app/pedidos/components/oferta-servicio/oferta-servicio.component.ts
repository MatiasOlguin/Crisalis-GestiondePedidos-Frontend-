import { PedidosService } from './../../pedidos.service';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Servicio } from 'src/app/servicios/servicio';
import { Item } from '../../interfaces/item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-oferta-servicio',
  templateUrl: './oferta-servicio.component.html',
  styleUrls: ['./oferta-servicio.component.css'],
})
export class OfertaServicioComponent implements OnInit, OnDestroy {
  item!: Item;
  @Input() clicked!: boolean;
  @Input() servicio!: Servicio;
  @Output() onEnviarItem: EventEmitter<Item> = new EventEmitter();
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

  actualizar() {
    let aux = this.pedidosService.pedido.items.find(
      (item) => item.servicio?.id == this.servicio.id
    );
    if (aux != undefined) {
      this.clicked = true;
    } else this.clicked = false;
  }

  crearItem(): Item | undefined {
    if (!this.clicked) {
      this.item = {
        producto: null,
        adicional:null,
        aniosGarantia: null,
        servicio: this.servicio,
        cantidad: 1,
        subtotal: this.servicio.montoBase,
        iva: this.servicio.montoBase * 0.21,
        iibb: this.servicio.montoBase * 0.035,
        total:
          this.servicio.montoBase +
          this.servicio.montoBase * 0.21 +
          this.servicio.montoBase * 0.035,
      };

      this.clicked = true;
      return this.item;
    } else return;
  }

  enviar() {
    this.onEnviarItem.emit(this.crearItem());
  }
}
