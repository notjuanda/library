import { useQuery } from '@tanstack/react-query';
import instance from '../../core/api/instance.api';
import type { Genero } from '../../core/types/genero.types';

const getGeneros = async (): Promise<Genero[]> => {
    const { data } = await instance.get('/generos/');
    return data;
};

export const useGeneros = () => useQuery({ queryKey: ['generos'], queryFn: getGeneros });
