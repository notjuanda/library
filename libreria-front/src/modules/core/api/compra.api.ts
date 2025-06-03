import instance from './instance.api';
import type { Compra } from '../types/compra.types';

const API_URL = '/compras/';

export const getCompras = async (): Promise<Compra[]> => {
    const { data } = await instance.get(API_URL);
    return data;
};

export const getCompra = async (id: number): Promise<Compra> => {
    const { data } = await instance.get(`${API_URL}${id}/`);
    return data;
};

export const createCompra = async (compra: Partial<Compra>, comprobanteFile?: File): Promise<Compra> => {
    if (comprobanteFile) {
        const formData = new FormData();
        Object.entries(compra).forEach(([key, value]) => {
            if (value !== undefined && value !== null) formData.append(key, value as any);
        });
        formData.append('comprobante_pago', comprobanteFile);

        const { data } = await instance.post(API_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data;
    } else {
        const { data } = await instance.post(API_URL, compra);
        return data;
    }
};

export const updateCompra = async (id: number, compra: Partial<Compra>, comprobanteFile?: File): Promise<Compra> => {
    if (comprobanteFile) {
        const formData = new FormData();
        Object.entries(compra).forEach(([key, value]) => {
            if (value !== undefined && value !== null) formData.append(key, value as any);
        });
        formData.append('comprobante_pago', comprobanteFile);

        const { data } = await instance.put(`${API_URL}${id}/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data;
    } else {
        const { data } = await instance.put(`${API_URL}${id}/`, compra);
        return data;
    }
};

export const deleteCompra = async (id: number): Promise<void> => {
    await instance.delete(`${API_URL}${id}/`);
};
