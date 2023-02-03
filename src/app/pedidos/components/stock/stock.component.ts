import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  min : number=0;
  @Input() evento=false;
  @Input() max: any;

  private _stock : number=0;

  get stock() : number{
    return this._stock;
  }
  acumular(cantidad : number){
    this._stock += cantidad;

    if(this.stock < this.min)
    this._stock=this.min;

    if(this.stock > this.max)
    this._stock=this.max;
  }

  reset (){
    this._stock=this.min;
  }
}
