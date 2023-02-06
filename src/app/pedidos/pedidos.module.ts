import { PedidosRoutingModule } from './pedidos-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListadoComponent } from './pages/listado/listado.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { VerItemsComponent } from './pages/ver-items/ver-items.component';
import { SeleccionarComponent } from './pages/seleccionar/seleccionar.component';
import { StockComponent } from './components/stock/stock.component';
import { OfertaProductoComponent } from './components/oferta-producto/oferta-producto.component';
import { OfertaServicioComponent } from './components/oferta-servicio/oferta-servicio.component';
import { ItemComponent } from './components/item/item.component';
import { CantidadComponent } from './components/cantidad/cantidad.component';
import { PedidoComponent } from './pages/pedido/pedido.component';

@NgModule({
  declarations: [
    ListadoComponent,
    HomeComponent,
    PedidoComponent,
    SeleccionarComponent,
    VerItemsComponent,
    StockComponent,
    OfertaProductoComponent,
    OfertaServicioComponent,
    ItemComponent,
    CantidadComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PedidosModule { }
