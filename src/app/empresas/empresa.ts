export interface Empresa {
  id: number;
  razonSocial: string;
  inicioActividades: string;
  cuit: string;
  createAt: string;
  empleados: EmpleadoNombreCompleto[];
}

export interface EmpleadoNombreCompleto{
  id: number,
  nombreCompleto: string
}