import instance from './instance.api';
import type { Carrito, CarritoItem } from '../types/carrito.types';

const API_URL = '/carritos/';

export const getCarrito = async (): Promise<Carrito> => {
    const { data } = await instance.get(API_URL);
    console.log('Carrito fetched:', data);
    console.log('entrado a getCarrito');
    return data;
};

export const createCarrito = async (): Promise<Carrito> => {
    const { data } = await instance.post(API_URL);
    return data;
};

export const updateCarrito = async (id: number, carrito: Partial<Carrito>): Promise<Carrito> => {
    const { data } = await instance.put(`${API_URL}${id}/`, carrito);
    return data;
};

export const deleteCarrito = async (id: number): Promise<void> => {
    await instance.delete(`${API_URL}${id}/`);
};

const CAR_ITEM_URL = '/carrito-items/';

export const getCarritoItems = async (): Promise<CarritoItem[]> => {
    const { data } = await instance.get(CAR_ITEM_URL);
    console.log('Carrito items fetched:', data);
    return data;
};

export const addCarritoItem = async (item: Partial<CarritoItem>): Promise<CarritoItem> => {
    const { data } = await instance.post(CAR_ITEM_URL, item);
    return data;
};

export const updateCarritoItem = async (id: number, item: Partial<CarritoItem>): Promise<CarritoItem> => {
    const { data } = await instance.put(`${CAR_ITEM_URL}${id}/`, item);
    return data;
};

export const deleteCarritoItem = async (id: number): Promise<void> => {
    await instance.delete(`${CAR_ITEM_URL}${id}/`);
};
