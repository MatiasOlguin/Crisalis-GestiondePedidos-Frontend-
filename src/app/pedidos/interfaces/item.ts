import { Servicio } from 'src/app/servicios/servicio';
import { Producto } from 'src/app/productos/producto';

export interface Item {
  id?: number;
  cantidad: number;
  producto: Producto | null;
  servicio: Servicio | null;
  iva: number;
  iibb: number;
  adicional: number | null;
  aniosGarantia: number | null;
  subtotal: number;
  total: number;
}
