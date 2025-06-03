import React from 'react';
import { useCrearLibro } from '../hooks/useCrearLibro';
import CrearLibroForm from '../components/CrearLibroForm';
import { useNavigate } from 'react-router-dom';

const CrearLibroPage: React.FC = () => {
    const { crearLibro, loading, error } = useCrearLibro();
    const navigate = useNavigate();

    const handleCrearLibro = async (data: {
        nombre: string;
        autor: string;
        precio: number;
        isbn: string;
        descripcion: string;
        foto?: File | null;
    }) => {
        const { foto, ...libroData } = data;
        const nuevoLibro = await crearLibro(libroData, foto || undefined);
        if (nuevoLibro) {
        navigate('/admin');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Crear Nuevo Libro</h1>
        <CrearLibroForm onSubmit={handleCrearLibro} loading={loading} error={error} />
        </div>
    );
};

export default CrearLibroPage;
