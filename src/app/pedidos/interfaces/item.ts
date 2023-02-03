import { Servicio } from 'src/app/servicios/servicio';
import { Producto } from 'src/app/productos/producto';

export interface Item {
  id?: number;
  cantidad: number;
  producto?: Producto;
  servicio?: Servicio;
  IVA?: number;
  IIBB?: number;
  adicional?: number;
  aniosGarantia?: number;
  subtotal?: number;
  total?: number;
}
