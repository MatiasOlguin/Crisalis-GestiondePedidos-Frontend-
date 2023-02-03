import { Item } from './item';
export interface Pedido {
  id?: number,
  createAt?: string,
  estado?: string,
  total?: number,
  items: Item[],
  cliente: {
    id?: number,
    nombreCompleto?: string
  }
}