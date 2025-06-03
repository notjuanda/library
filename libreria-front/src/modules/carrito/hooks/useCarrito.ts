import { useQuery } from '@tanstack/react-query';
import { getCarrito } from '../../core/api/carrito.api';
import type { Carrito } from '@/modules/core/types/carrito.types';

export const useCarrito = () => {
    return useQuery<Carrito[], Error>({
        queryKey: ['carrito'],
        queryFn: async () => {
        const carrito = await getCarrito();
        return Array.isArray(carrito) ? carrito : [carrito];
        },
    });
};
