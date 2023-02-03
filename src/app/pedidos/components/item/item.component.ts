import { PedidosService } from './../../pedidos.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../interfaces/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() item!: Item;
  @Output() onEliminar: EventEmitter<Item> = new EventEmitter();

  showGarantia: boolean = false;
  showCargo: boolean = false;
  resultadoGarantia: number = 0;
  cargoSoporte!: any;
  bloquearCargo: boolean = false;
  anios: number = 0;

  constructor(private pedidosService: PedidosService) {}

  eliminar() {
    this.onEliminar.emit(this.item);
  }

  mostrarGarantia() {
    if (!this.item.adicional) {
      this.showGarantia = !this.showGarantia ? true : false;
      this.anios = 0;
      this.resultadoGarantia = 0;
    }
  }

  mostrarCargo() {
    this.showCargo = !this.showCargo ? true : false;
    this.cargoSoporte = 0;
  }

  calcularGarantia(anios: number) {
    if (this.item.producto) {
      this.resultadoGarantia =
        this.item.producto.montoBase * this.item.cantidad * 0.02 * anios;
      this.anios = anios;
    } else return;
  }

  setAdicional() {
    if (this.item.producto && this.anios != 0) {
      this.item.adicional = this.resultadoGarantia;
      if (this.item.subtotal) this.item.subtotal += this.resultadoGarantia;
      if (this.item.IVA) this.item.IVA += this.resultadoGarantia * 0.21;
      if (this.item.IIBB) this.item.IIBB += this.resultadoGarantia * 0.035;
      if (this.item.total)
        this.item.total +=
          this.resultadoGarantia +
          this.resultadoGarantia * 0.21 +
          this.resultadoGarantia * 0.035;
      this.item.aniosGarantia = this.anios;

      console.log(this.item);

      this.pedidosService.actualizarValores();
    }
  }

  setCargo() {
    if (this.item.servicio && this.cargoSoporte != 0) {
      this.item.adicional = parseInt(this.cargoSoporte);
      if (this.item.subtotal) this.item.subtotal += parseInt(this.cargoSoporte);
      if (this.item.total) this.item.total += parseInt(this.cargoSoporte);
    }
    this.bloquearCargo = true;
    this.pedidosService.actualizarValores();
  }

  validarFormato(event: any) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
    if (!regex.test(key)) {
      event.returnValue = false;
      if (event.preventDefault) {
        event.preventDefault();
      }
    }
  }
}
