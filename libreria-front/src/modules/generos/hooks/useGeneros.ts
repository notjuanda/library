import { useQuery } from '@tanstack/react-query';
import { getGeneros } from '../../core/api/genero.api';
import type { Genero } from '../../core/types/genero.types';

export const useGeneros = () => {
    return useQuery<Genero[], Error>({
        queryKey: ['generos'],
        queryFn: getGeneros,
    });
};
