export interface LibroInput {
    nombre: string;
    autor: string;
    precio: number;
    isbn: string;
    descripcion: string;
    generos_ids?: number[];
}