import {Usuario} from './Usuario';

export interface Producto{
    id_producto:number;
    nombre: string;
    cantidad: number;
    usuario_creador?: Usuario;
    fecha_creacion?: string;
    usuario_editor?: Usuario;
    fecha_edicion?: string;

}

