import { useQuery } from '@tanstack/react-query';
import type { Compra } from '@/modules/core/types/compra.types';
import { getCompra } from '@/modules/core/api/compra.api';

export const useCompra = (id: number) => {
    return useQuery<Compra, Error>({
        queryKey: ['compra', id],
        queryFn: () => getCompra(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
};
