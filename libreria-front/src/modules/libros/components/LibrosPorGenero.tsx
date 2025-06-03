import React from 'react';
import { useLibrosPorGenero } from '../hooks/useLibrosPorGenero';
import LibroCard from '../components/LibroCard';
import { useDeleteLibro } from '../hooks/useDeleteLibro';

interface Props {
    generoId: number;
}

const LibrosPorGenero: React.FC<Props> = ({ generoId }) => {
    const { data: libros, isLoading, error, refetch } = useLibrosPorGenero(generoId);
    const deleteLibro = useDeleteLibro();

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Estás seguro de eliminar este libro?')) {
            try {
                await deleteLibro.mutateAsync(id);
                refetch();
            } catch (err) {
                alert('Error al eliminar el libro');
            }
        }
    };

    if (isLoading) return <p>Cargando libros del género...</p>;
    if (error) return <p className="text-red-600">Error cargando libros: {error.message}</p>;
    if (!libros || libros.length === 0) return <p>No hay libros para mostrar en este género.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {libros.map(libro => (
                <LibroCard key={libro.id} libro={libro} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default LibrosPorGenero;
