import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as carritoApi from '../../core/api/carrito.api';

export const useDeleteCarritoItem = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: (id) => carritoApi.deleteCarritoItem(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carrito'] });
            queryClient.invalidateQueries({ queryKey: ['carritoItems'] });
        },
    });
};
