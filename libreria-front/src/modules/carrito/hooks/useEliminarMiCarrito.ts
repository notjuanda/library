import { useMutation, useQueryClient } from '@tanstack/react-query';
import { eliminarMiCarrito } from '@/modules/core/api/carrito.api';

export const useEliminarMiCarrito = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error>({
        mutationFn: () => eliminarMiCarrito(),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['carrito'] });
        queryClient.invalidateQueries({ queryKey: ['carritoItems'] });
        },
    });
};
