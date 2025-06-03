import instance from './instance.api';
import type { Usuario } from '../types/usuario.types';

const API_URL = '/usuarios/';

export const getUsuarios = async (): Promise<Usuario[]> => {
    const { data } = await instance.get(API_URL);
    return data;
};

export const getUsuario = async (id: number): Promise<Usuario> => {
    const { data } = await instance.get(`${API_URL}${id}/`);
    return data;
};

export const getMe = async (): Promise<Usuario> => {
    const { data } = await instance.get(`${API_URL}me/`);
    return data;
};
