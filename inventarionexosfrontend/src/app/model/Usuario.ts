import {Cargo} from './Cargo';

export interface Usuario{
    id_usuario?:number;
    nombre_usuario: string;
    edad:number;
    fecha_ingreso?:string;
    cargo?:Cargo;
}

