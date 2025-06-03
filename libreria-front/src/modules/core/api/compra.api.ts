import instance from './instance.api';
import type { Compra, CompraCreateInput  } from '../types/compra.types';

const API_URL = '/compras/';

export const getCompras = async (): Promise<Compra[]> => {
    const { data } = await instance.get(API_URL);
    return data;
};

export const getCompra = async (id: number): Promise<Compra> => {
    const { data } = await instance.get(`${API_URL}${id}/`);
    return data;
};

export const createCompra = async (
    compra: Partial<CompraCreateInput>,
    comprobanteFile?: File
    ): Promise<Compra> => {
    console.log('Creating compra with data:', compra, 'and file:', comprobanteFile);

    if (comprobanteFile) {
        const formData = new FormData();

        Object.entries(compra).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (key === 'detalles' && Array.isArray(value)) {
            const detallesStr = JSON.stringify(value);
            console.log(`Appending 'detalles' as JSON string:`, detallesStr);
            formData.append('detalles', detallesStr);
            } else {
            console.log(`Appending '${key}' with value:`, value);
            formData.append(key, value as any);
            }
        }
        });

        console.log('Appending comprobante_pago file:', comprobanteFile.name);
        formData.append('comprobante_pago', comprobanteFile);

        for (const pair of formData.entries()) {
        console.log('FormData entry:', pair[0], pair[1]);
        }

        const { data } = await instance.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('Compra created with file response:', data);
        return data;
    } else {
        console.log('Posting compra JSON data:', compra);
        const { data } = await instance.post(API_URL, compra);
        console.log('Compra created response:', data);
        return data;
    }
};


export const updateCompra = async (id: number, compra: Partial<Compra>, comprobanteFile?: File): Promise<Compra> => {
    if (comprobanteFile) {
        const formData = new FormData();
        Object.entries(compra).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (key === 'detalles' && Array.isArray(value)) {
                    formData.append('detalles', JSON.stringify(value));
                } else {
                    formData.append(key, value as any);
                }
            }
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
