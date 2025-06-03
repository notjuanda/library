import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGenero } from '../../core/api/genero.api';

export const useDeleteGenero = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: deleteGenero,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['generos'] as const });
        }
    });
};
