import { useQuery } from '@tanstack/react-query';
import { getTop10Libros } from '../../core/api/libro.api';
import type { Libro } from '../../core/types/libro.types';

export const useTop10Libros = () => {
    return useQuery<Libro[], Error>({
        queryKey: ['top10Libros'],
        queryFn: getTop10Libros
    });
};
