import type { Libro } from './libro.types';

export interface CarritoItem {
    id: number;
    libro: Libro;
    libro_id: number;
    cantidad: number;
}

export interface Carrito {
    id: number;
    usuario: string;
    items: CarritoItem[];
}