import React from 'react';
import type { CarritoItem } from '@/modules/core/types/carrito.types';
import CarritoItemCard from './CarritoItemCard';

interface Props {
    items?: CarritoItem[] | null;
}

const CarritoItemList: React.FC<Props> = ({ items }) => {
    if (!items || items.length === 0) return <p>Tu carrito está vacío.</p>;

    return (
        <div className="space-y-4">
            {items.map(item => (
                <CarritoItemCard key={item.id} item={item} />
            ))}
        </div>
    );
};

export default CarritoItemList;
