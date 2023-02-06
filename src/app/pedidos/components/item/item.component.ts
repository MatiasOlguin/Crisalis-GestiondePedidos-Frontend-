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
  resultadoGarantia: number = 0;
  showGarantia: boolean = false;
  showCargo: boolean = false;
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
    if (!this.bloquearCargo) {
      this.showCargo = !this.showCargo ? true : false;
      this.cargoSoporte = 0;
    }
  }

  calcularGarantia(anios: number) {
    if (this.item.producto) {
      this.resultadoGarantia = (this.item.total || 0) * 0.02 * anios;
      this.anios = anios;
    } else return;
  }

  setAdicional() {
    if (this.item.producto && this.anios != 0) {
      this.item.adicional = this.resultadoGarantia;
      this.item.aniosGarantia = this.anios;
      this.pedidosService.actualizarValores();
    }
  }

  setCargo() {
    if (this.item.servicio && this.cargoSoporte != 0) {
      this.item.adicional = parseInt(this.cargoSoporte);
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
