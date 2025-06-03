import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { createGenero } from '../../core/api/genero.api';
import type { Genero } from '../../core/types/genero.types';

export const useCreateGenero = (): UseMutationResult<Genero, Error, Partial<Genero>> => {
    const queryClient = useQueryClient();

    return useMutation<Genero, Error, Partial<Genero>>({
        mutationFn: createGenero,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['generos'] });
        },
    });
};
