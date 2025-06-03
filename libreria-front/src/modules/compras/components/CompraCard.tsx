import React from 'react';
import type { Compra } from '../../core/types/compra.types';

interface Props {
    compra: Compra;
    onClick?: () => void;
}

const CompraCard: React.FC<Props> = ({ compra, onClick }) => {
    return (
        <div
        className="border rounded-md p-4 shadow hover:shadow-md transition cursor-pointer"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyPress={e => {
            if (e.key === 'Enter' && onClick) onClick();
        }}
        >
        <p className="font-semibold">Compra #{compra.id}</p>
        <p className="text-sm text-muted-foreground">Usuario: {compra.usuario}</p>
        <p className="text-sm font-bold">Monto Total: ${Number(compra.monto_total).toFixed(2)}</p>
        <p className="text-sm">
            Estado:{' '}
            <span
            className={
                compra.estado === 'confirmada'
                ? 'text-green-600'
                : compra.estado === 'pendiente'
                ? 'text-yellow-600'
                : 'text-red-600'
            }
            >
            {compra.estado}
            </span>
        </p>
        <p className="text-sm">Fecha: {new Date(compra.fecha).toLocaleString()}</p>

        {compra.comprobante_pago && (
            <img
            src={compra.comprobante_pago}
            alt={`Comprobante Compra #${compra.id}`}
            className="mt-2 max-w-full h-auto rounded"
            />
        )}

        <div className="mt-3">
            <p className="font-semibold mb-1">Detalles:</p>
            <ul className="list-disc list-inside max-h-40 overflow-auto text-sm">
            {compra.detalles.map(detalle => (
                <li key={detalle.id}>
                {detalle.libro.nombre} x {detalle.cantidad}
                </li>
            ))}
            </ul>
        </div>

        <p className="text-xs text-muted-foreground mt-2">QR: {compra.qr}</p>
        </div>
    );
};

export default CompraCard;
