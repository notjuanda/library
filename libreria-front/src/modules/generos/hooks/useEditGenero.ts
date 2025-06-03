import { useState } from 'react';
import { updateGenero } from '../../core/api/genero.api';
import type { Genero } from '../../core/types/genero.types';

export const useEditGenero = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const editGenero = async (id: number, data: Partial<Genero>): Promise<Genero | null> => {
        setLoading(true);
        setError(null);
        try {
        const updatedGenero = await updateGenero(id, data);
        setLoading(false);
        return updatedGenero;
        } catch (err: any) {
        setError(
            err.response?.data?.error || 
            err.response?.data?.detail || 
            err.message || 
            'Error desconocido'
        );
        setLoading(false);
        return null;
        }
    };

    return { editGenero, loading, error };
};
