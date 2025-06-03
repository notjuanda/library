import type { Libro } from './libro.types';

export interface DetalleCompra {
    id: number;
    libro: Libro;
    libro_id: number;
    cantidad: number;
}

export interface Compra {
    id: number;
    usuario: string;
    monto_total: number;
    comprobante_pago?: string;
    qr: string;
    fecha: string;
    estado: 'pendiente' | 'confirmada' | 'cancelada';
    detalles: DetalleCompra[];
}
export interface DetalleCompraCreate {
    libro_id: number;
    cantidad: number;
}
export interface CompraCreateInput {
    monto_total: number;
    qr: string;
    detalles: DetalleCompraCreate[];
    comprobante_pago?: string;
}