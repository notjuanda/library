import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as carritoApi from '../../core/api/carrito.api';
import type { CarritoItem } from '@/modules/core/types/carrito.types';

export const useUpdateCarritoItem = () => {
    const queryClient = useQueryClient();

    return useMutation<CarritoItem, Error, { id: number; data: Partial<CarritoItem> }>({
        mutationFn: ({ id, data }) => carritoApi.updateCarritoItem(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carrito'] });
            queryClient.invalidateQueries({ queryKey: ['carritoItems'] });
        },
    });
};
