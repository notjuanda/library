import { useState } from 'react';
import { createLibro } from '../../core/api/libro.api';
import type { Libro } from '../../core/types/libro.types';
import type { LibroInput } from '../types/libro.types';

export const useCrearLibro = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const crearLibro = async (libro: LibroInput, fotoFile?: File): Promise<Libro | null> => {
        setLoading(true);
        setError(null);
        try {
        const nuevoLibro = await createLibro(libro, fotoFile);
        setLoading(false);
        return nuevoLibro;
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

    return { crearLibro, loading, error };
};
