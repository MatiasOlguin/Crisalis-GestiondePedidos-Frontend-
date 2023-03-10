import { ServicioActivo } from './servicio-activo';

export interface Cliente {
  id?: number;
  nombre: string;
  apellido: string;
  dni: string;
  createAt?: string;
  empresa?: {
    id: number,
    razonSocial: string
  };
  servicios : ServicioActivo[];
}