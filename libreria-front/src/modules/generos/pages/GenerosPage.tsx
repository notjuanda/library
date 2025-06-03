import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGeneros } from '../hooks/useGeneros';
import { useDeleteGenero } from '../hooks/useDeleteGenero';
import GeneroCard from '../components/GeneroCard';

const GenerosPage: React.FC = () => {
    const navigate = useNavigate();
    const { data: generos, isLoading, error } = useGeneros();
    const deleteMutation = useDeleteGenero();

    const handleEdit = (id: number) => {
        navigate(`/generos/editar/${id}`);
    };

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Géneros</h1>
            <button
            onClick={() => navigate('/generos/crear')}
            className="bg-button text-white px-4 py-2 rounded hover:bg-button-hoverProduct transition"
            >
            Crear nuevo género
            </button>
        </div>

        {isLoading && <p>Cargando géneros...</p>}
        {error && <p className="text-destructive">Error al cargar géneros: {error.message}</p>}

        {!isLoading && generos && generos.length === 0 && (
            <p className="text-center text-muted-foreground">No hay géneros para mostrar.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {generos?.map(genero => (
            <GeneroCard
                key={genero.id}
                genero={genero}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            ))}
        </div>

        {deleteMutation.isError && (
            <p className="text-red-600 mt-4">
            Error eliminando género: {deleteMutation.error?.message}
            </p>
        )}
        </div>
    );
};

export default GenerosPage;
