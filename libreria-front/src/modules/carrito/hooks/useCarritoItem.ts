import { useQuery } from '@tanstack/react-query';
import * as carritoApi from '../../core/api/carrito.api';
import type { CarritoItem } from '@/modules/core/types/carrito.types';

export const useCarritoItems = () => {
    return useQuery<CarritoItem[], Error>({
        queryKey: ['carritoItems'],
        queryFn: carritoApi.getCarritoItems,
    });
};
