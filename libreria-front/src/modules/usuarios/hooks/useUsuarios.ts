import { useQuery } from '@tanstack/react-query';
import { getUsuarios } from '../../core/api/usuario.api';
import type { Usuario } from '../../core/types/usuario.types';

export const useUsuarios = () => {
    return useQuery<Usuario[], Error>({
        queryKey: ['usuarios'],
        queryFn: getUsuarios,
    });
};
