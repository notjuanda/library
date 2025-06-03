import { useQuery } from '@tanstack/react-query';
import { getLibrosPorGenero } from '../../core/api/libro.api';
import type { Libro } from '../../core/types/libro.types';

export const useLibrosPorGenero = (generoId: number) => {
    return useQuery<Libro[], Error>({
        queryKey: ['libros', 'por-genero', generoId],
        queryFn: () => getLibrosPorGenero(generoId),
        enabled: !!generoId,
        staleTime: 1000 * 60 * 5,
    });
};
