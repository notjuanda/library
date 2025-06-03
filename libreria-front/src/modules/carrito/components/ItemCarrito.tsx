import React, { useState } from 'react';
import type { CarritoItem } from '../../core/types/carrito.types';
import { useDeleteCarritoItem } from '../hooks/useDeleteCarritoItem';

interface Props {
    item: CarritoItem;
}

const ItemCarrito: React.FC<Props> = ({ item }) => {
    const [cantidad, setCantidad] = useState(item.cantidad);
    const eliminarItem = useDeleteCarritoItem();

    const handleCantidadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const nuevaCantidad = Number(e.target.value);
        if (nuevaCantidad < 1) return;
        setCantidad(nuevaCantidad);

    };

    const handleEliminar = async () => {
        if (window.confirm('¿Eliminar este libro del carrito?')) {
        try {
            await eliminarItem.mutateAsync(item.id);
        } catch {
            alert('Error eliminando el item');
        }
        }
    };

    return (
        <div className="flex items-center space-x-4 p-4 border rounded">
        <img src={item.libro.foto} alt={item.libro.nombre} className="w-20 h-24 object-cover rounded" />
        <div className="flex-1">
            <h3 className="font-semibold">{item.libro.nombre}</h3>
            <p className="text-sm text-muted-foreground">{item.libro.autor}</p>
            <p className="font-bold">${item.libro.precio.toFixed(2)}</p>
        </div>
        <div>
            <input
            type="number"
            min={1}
            value={cantidad}
            onChange={handleCantidadChange}
            className="w-16 border rounded px-2 py-1 text-center"
            />
        </div>
        <button
            onClick={handleEliminar}
            className="text-red-600 hover:text-red-800 font-semibold px-3 py-1 border border-red-600 rounded"
        >
            Eliminar
        </button>
        </div>
    );
};

export default ItemCarrito;
