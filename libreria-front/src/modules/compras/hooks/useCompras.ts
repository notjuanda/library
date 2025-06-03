import { useQuery } from '@tanstack/react-query';
import { getCompras } from '../../core/api/compra.api';
import type { Compra } from '../../core/types/compra.types';

export const useCompras = () => {
    return useQuery<Compra[], Error>({
        queryKey: ['compras'],
        queryFn: getCompras,
    });
};
