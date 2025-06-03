import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLibro } from '../../core/api/libro.api';
import type { Libro } from '../../core/types/libro.types';
import LibroForm from '../components/LibroForm';
import { useEditLibro } from '../hooks/useEditLibro';

const EditarLibroPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [libro, setLibro] = useState<Libro | null>(null);
    const [loadingLibro, setLoadingLibro] = useState(true);

    const { editLibro, loading, error } = useEditLibro();

    useEffect(() => {
        if (!id) return;
        setLoadingLibro(true);
        getLibro(Number(id))
        .then(data => setLibro(data))
        .finally(() => setLoadingLibro(false));
    }, [id]);

    const handleSubmit = async (data: Partial<Libro>, fotoFile?: File) => {
        if (!id) return;
        await editLibro(Number(id), data, fotoFile);
        navigate('/admin');
    };

    if (loadingLibro) return <p>Cargando libro...</p>;
    if (!libro) return <p>No se encontró el libro.</p>;

    return (
        <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Editar Libro</h1>
        <LibroForm initialData={libro} onSubmit={handleSubmit} loading={loading} error={error} />
        </div>
    );
};

export default EditarLibroPage;
