import { useState } from 'react';
import { useAuth } from '../../core/hooks/useAuth';
import type { IRegisterData } from '../../core/types/register.types';
import axios from 'axios';

export const useRegister = () => {
    const { register } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const doRegister = async (data: IRegisterData) => {
        setLoading(true);
        setError(null);
        try {
        const user = await register(data);
        setLoading(false);
        return user;
        } catch (err: any) {
        if (axios.isAxiosError(err) && err.response) {
            switch (err.response.status) {
            case 400:
                setError('Faltan datos o formato inválido');
                break;
            case 409:
                setError('El usuario o email ya existen');
                break;
            case 500:
                setError('Error del servidor, intenta más tarde');
                break;
            default:
                setError(err.response.data?.detail || 'Error desconocido');
            }
        } else {
            setError('Error de conexión o inesperado');
        }
        setLoading(false);
        throw err;
        }
    };

    return { doRegister, loading, error };
};
