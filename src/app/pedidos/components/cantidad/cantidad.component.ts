import { outputAst } from '@angular/compiler';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cantidad',
  templateUrl: './cantidad.component.html',
  styleUrls: ['./cantidad.component.css']
})
export class CantidadComponent {
  min : number=0;
  max: number=5;
  cantidad : number=0;

  @Output() onCantidad : EventEmitter<number>= new EventEmitter();


  acumular(cantidad : number){
    this.cantidad+= cantidad;

    if(this.cantidad < this.min)
    this.cantidad=this.min;

    if(this.cantidad > this.max)
    this.cantidad=this.max;

    this.onCantidad.emit(this.cantidad);
  }
}
