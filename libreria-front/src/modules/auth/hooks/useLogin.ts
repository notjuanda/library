import { useState } from 'react';
import type { ILoginPayload, ILoginResponse } from '../types/auth.types';
import { useAuth } from '../../core/hooks/useAuth';
import instance from '../../core/api/instance.api';

export const useLogin = () => {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const doLogin = async (payload: ILoginPayload) => {
        setLoading(true);
        setError(null);
        try {
        const { data } = await instance.post<ILoginResponse>('/auth/login/', payload);
        
        
        await login(data.username, payload.password); 

        setLoading(false);
        return data;
        } catch (err: any) {
        setError(err.response?.data?.detail || 'Error en login');
        setLoading(false);
        throw err;
        }
    };

    return { doLogin, loading, error };
};
