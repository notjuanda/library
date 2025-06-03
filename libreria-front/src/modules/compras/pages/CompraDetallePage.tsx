import React from 'react';
import { useParams } from 'react-router-dom';
import { useCompra } from '../hooks/useCompra';

const CompraDetallePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const compraId = Number(id);

    const { data: compra, isLoading, error } = useCompra(compraId);

    if (isLoading) return <p>Cargando detalle de compra...</p>;
    if (error) return <p>Error al cargar la compra: {error.message}</p>;
    if (!compra) return <p>No se encontró la compra.</p>;

    return (
        <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Detalle de Compra #{compra.id}</h1>

        <p><strong>Usuario:</strong> {compra.usuario}</p>
        <p><strong>Monto Total:</strong> {compra.monto_total}</p>
        <p>
            <strong>Estado:</strong>{' '}
            <span
            className={
                compra.estado === 'confirmada' ? 'text-green-600' :
                compra.estado === 'pendiente' ? 'text-yellow-600' : 'text-red-600'
            }
            >
            {compra.estado}
            </span>
        </p>
        <p><strong>Fecha:</strong> {new Date(compra.fecha).toLocaleString()}</p>

        {compra.comprobante_pago && (
            <div className="my-4">
            <p className="font-semibold mb-2">Comprobante de Pago:</p>
            <img
                src={compra.comprobante_pago}
                alt={`Comprobante Compra #${compra.id}`}
                className="max-w-full rounded shadow"
            />
            </div>
        )}

        <div>
            <p className="font-semibold mb-2">Detalles:</p>
            <ul className="list-disc list-inside max-h-60 overflow-auto">
            {compra.detalles.map(detalle => (
                <li key={detalle.id}>
                {detalle.libro.nombre} x {detalle.cantidad}
                </li>
            ))}
            </ul>
        </div>

        <p className="text-sm text-muted-foreground mt-4"><strong>QR:</strong> {compra.qr}</p>
        </div>
    );
};

export default CompraDetallePage;
