import { useQuery } from '@tanstack/react-query';
import { getLibros } from '../../core/api/libro.api';
import type { Libro } from '../../core/types/libro.types';

export const useLibros = () => {
    return useQuery<Libro[], Error>({
        queryKey: ['libros'],
        queryFn: getLibros,
        staleTime: 1 * 60 * 1000,
    });
};
