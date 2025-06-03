import instance from './instance.api';
import type { Libro } from '../types/libro.types';

const API_URL = '/libros/';

export const getLibros = async (): Promise<Libro[]> => {
    const { data } = await instance.get(API_URL);
    return data;
};

export const getLibro = async (id: number): Promise<Libro> => {
    const { data } = await instance.get(`${API_URL}${id}/`);
    return data;
};

export const createLibro = async (libro: Partial<Libro>, fotoFile?: File): Promise<Libro> => {
    if (fotoFile) {
        const formData = new FormData();
        Object.entries(libro).forEach(([key, value]) => {
            if (value !== undefined && value !== null) formData.append(key, value as any);
        });
        formData.append('foto', fotoFile);

        const { data } = await instance.post(API_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data;
    } else {
        const { data } = await instance.post(API_URL, libro);
        return data;
    }
};

export const updateLibro = async (id: number, libro: Partial<Libro>, fotoFile?: File): Promise<Libro> => {
    if (fotoFile) {
        const formData = new FormData();
        Object.entries(libro).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (key === 'generos_ids' && Array.isArray(value)) {
            value.forEach(id => formData.append('generos_ids', String(id)));
            } else {
            formData.append(key, value as any);
            }
        }
        });
        formData.append('foto', fotoFile);

        const { data } = await instance.put(`${API_URL}${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data;
    } else {
        const { data } = await instance.put(`${API_URL}${id}/`, libro);
        return data;
    }
};


export const deleteLibro = async (id: number): Promise<void> => {
    await instance.delete(`${API_URL}${id}/`);
};

export const getTop10Libros = async (): Promise<Libro[]> => {
    const { data } = await instance.get(`${API_URL}top_10/`);
    return data;
};

export const getLibrosPorGenero = async (generoId: number): Promise<Libro[]> => {
    const { data } = await instance.get(`${API_URL}por-genero/${generoId}/`);
    return data;
};
