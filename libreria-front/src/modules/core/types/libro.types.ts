export interface Libro {
    id: number;
    foto: string;
    nombre: string;
    autor: string;
    precio: number;
    isbn: string;
    descripcion: string;
    generos: { id: number; nombre: string }[];
    ventas: number;
}
