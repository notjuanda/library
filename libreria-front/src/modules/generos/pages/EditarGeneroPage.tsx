import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGenero } from '../../core/api/genero.api';
import type { Genero } from '../../core/types/genero.types';
import EditarGeneroForm from '../components/EditarGeneroForm';
import { useEditGenero } from '../hooks/useEditGenero';

const EditarGeneroPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [genero, setGenero] = useState<Genero | null>(null);
    const [loadingGenero, setLoadingGenero] = useState(true);

    const { editGenero, loading, error } = useEditGenero();

    useEffect(() => {
        if (!id) return;
        setLoadingGenero(true);
        getGenero(Number(id))
        .then(setGenero)
        .finally(() => setLoadingGenero(false));
    }, [id]);

    const handleSubmit = async (data: Partial<Genero>) => {
        if (!id) return;
        const updated = await editGenero(Number(id), data);
        if (updated) {
        navigate('/admin/generos');
        }
    };

    if (loadingGenero) return <p>Cargando género...</p>;
    if (!genero) return <p>No se encontró el género.</p>;

    return (
        <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Editar Género</h1>
        <EditarGeneroForm initialData={genero} onSubmit={handleSubmit} loading={loading} error={error} />
        </div>
    );
};

export default EditarGeneroPage;
