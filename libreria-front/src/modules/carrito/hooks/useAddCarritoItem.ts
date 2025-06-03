import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as carritoApi from '../../core/api/carrito.api';
import type { CarritoItem } from '@/modules/core/types/carrito.types';

export const useAddCarritoItem = () => {
    const queryClient = useQueryClient();

    return useMutation<CarritoItem, Error, Partial<CarritoItem>>({
        mutationFn: carritoApi.addCarritoItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carrito'] });
            queryClient.invalidateQueries({ queryKey: ['carritoItems'] });
        },
    });
};
