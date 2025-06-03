import React, { useState } from 'react';
import { useCarrito } from '../hooks/useCarrito';
import CarritoItemList from '../components/CarritoItemList';
import ProcesarPagoPage from './ProcesarPago';

const CarritoPage: React.FC = () => {
    const { data: carritoList, isLoading, error } = useCarrito();
    const [procesarPago, setProcesarPago] = useState(false);

    if (isLoading) return <p>Cargando carrito...</p>;
    if (error) return <p>Error al cargar carrito: {error.message}</p>;
    if (!carritoList || carritoList.length === 0) return <p>Carrito vacío</p>;

    const carrito = carritoList[0];

    const monto_total = carrito.items.reduce(
        (sum, item) => sum + item.libro.precio * item.cantidad,
        0
    );

    const detalles = carrito.items.map((item) => ({
        libro_id: item.libro.id,
        cantidad: item.cantidad,
    }));

    if (procesarPago) {
        return (
        <ProcesarPagoPage
            monto={monto_total}
            detalles={detalles}
            qrText={`pago-monto-${monto_total.toFixed(2)}`}
        />
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>
            <CarritoItemList items={carrito.items} />

            <p className="mt-6 font-semibold">Total: ${monto_total.toFixed(2)}</p>
            {carrito.items.length > 0 && (
            <button
                onClick={() => setProcesarPago(true)}
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Procesar Pago
            </button>
            )}
        </div>
    );
};

export default CarritoPage;
