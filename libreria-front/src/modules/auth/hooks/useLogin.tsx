import { useState } from 'react';
import { useAuth } from '../../core/hooks/useAuth';
import type { ILoginPayload } from '../types/auth.types';
import axios from 'axios';

export const useLogin = () => {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const doLogin = async (payload: ILoginPayload) => {
        setLoading(true);
        setError(null);
        try {
            const user = await login(payload.username, payload.password);
            setLoading(false);
            return user;
        } catch (err: any) {
            if (axios.isAxiosError(err) && err.response) {
                switch (err.response.status) {
                    case 400:
                        setError('Faltan datos o formato inválido');
                        break;
                    case 401:
                        setError('Usuario o contraseña incorrectos');
                        break;
                    case 403:
                        setError('Acceso denegado');
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

    return { doLogin, loading, error };
};
