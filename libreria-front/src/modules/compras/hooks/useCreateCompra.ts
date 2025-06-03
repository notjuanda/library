import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCompra } from '@/modules/core/api/compra.api';
import type { Compra, CompraCreateInput } from '@/modules/core/types/compra.types';

type CreateCompraVariables = {
    compra: Partial<CompraCreateInput>;
    comprobanteFile?: File;
};

export const useCreateCompra = () => {
    const queryClient = useQueryClient();

    return useMutation<Compra, Error, CreateCompraVariables>({
        mutationFn: ({ compra, comprobanteFile }) => createCompra(compra, comprobanteFile),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['compras'] });
        queryClient.invalidateQueries({ queryKey: ['compra'] });
        },
    });
};
