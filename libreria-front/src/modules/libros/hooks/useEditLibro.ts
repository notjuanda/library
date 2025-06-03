import { useState } from 'react';
import { updateLibro } from '../../core/api/libro.api';
import type { Libro } from '../../core/types/libro.types';

export const useEditLibro = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const editLibro = async (id: number, libroData: Partial<Libro>, fotoFile?: File) => {
        setLoading(true);
        setError(null);

        try {
        const updated = await updateLibro(id, libroData, fotoFile);
        setLoading(false);
        return updated;
        } catch (err: any) {
        setLoading(false);
        setError(err.response?.data?.detail || err.message || 'Error desconocido');
        throw err;
        }
    };

    return { editLibro, loading, error };
};
