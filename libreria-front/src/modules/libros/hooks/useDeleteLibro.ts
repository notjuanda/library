import { useMutation } from '@tanstack/react-query';
import { deleteLibro } from '../../core/api/libro.api';

export const useDeleteLibro = () => {
    return useMutation({
        mutationFn: (id: number) => deleteLibro(id),
    });
};
