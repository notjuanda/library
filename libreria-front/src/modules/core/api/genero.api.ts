import instance from './instance.api';
import type { Genero } from '../types/genero.types';

const API_URL = '/generos/';

export const getGeneros = async (): Promise<Genero[]> => {
    const { data } = await instance.get(API_URL);
    return data;
};

export const getGenero = async (id: number): Promise<Genero> => {
    const { data } = await instance.get(`${API_URL}${id}/`);
    return data;
};

export const createGenero = async (genero: Partial<Genero>): Promise<Genero> => {
    const { data } = await instance.post(API_URL, genero);
    return data;
};

export const updateGenero = async (id: number, genero: Partial<Genero>): Promise<Genero> => {
    const { data } = await instance.put(`${API_URL}${id}/`, genero);
    return data;
};

export const deleteGenero = async (id: number): Promise<void> => {
    await instance.delete(`${API_URL}${id}/`);
};
