import { Servicio } from "src/app/servicios/servicio";

export interface ServicioActivo{
    id?:number;
    servicio:Servicio;
    estado:boolean;
    createAt:string;
}