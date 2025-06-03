import React, { useState } from 'react';
import type { CarritoItem } from '@/modules/core/types/carrito.types';
import { useUpdateCarritoItem } from '../hooks/useUpdateCarritoItem';
import { useDeleteCarritoItem } from '../hooks/useDeleteCarritoItem';

interface Props {
    item: CarritoItem;
}

const CarritoItemCard: React.FC<Props> = ({ item }) => {
    const [cantidad, setCantidad] = useState(item.cantidad);
    const updateMutation = useUpdateCarritoItem();
    const deleteMutation = useDeleteCarritoItem();

    const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        if (val >= 1) setCantidad(val);
    };

    const handleUpdate = () => {
        if (cantidad !== item.cantidad) {
        updateMutation.mutate({ id: item.id, data: { cantidad } });
        }
    };

    const handleDelete = () => {
        deleteMutation.mutate(item.id);
    };

    return (
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between border border-gray-300 rounded-2xl p-4 shadow-md hover:shadow-lg transition bg-white">
        <div className="flex items-center gap-4 w-full md:w-2/3">
            <img
            src={item.libro.foto}
            alt={item.libro.nombre}
            className="w-24 h-32 object-cover rounded-lg shadow-sm"
            />
            <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800">{item.libro.nombre}</h3>
            <p className="text-sm text-gray-500 mb-1">Autor: {item.libro.autor}</p>
            <p className="text-base font-bold text-green-700">${Number(item.libro.precio).toFixed(2)}</p>
            </div>
        </div>

        <div className="flex items-center gap-3 mt-4 md:mt-0">
            <input
            type="number"
            min={1}
            value={cantidad}
            onChange={handleCantidadChange}
            onBlur={handleUpdate}
            className="w-16 text-center p-1 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
            aria-label={`Cantidad de ${item.libro.nombre}`}
            max={cantidad}
            disabled
            />
            <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="text-red-600 hover:text-red-800 font-semibold text-sm"
            aria-label={`Eliminar ${item.libro.nombre} del carrito`}
            >
            {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
            </button>
        </div>
        </div>
    );
};

export default CarritoItemCard;
