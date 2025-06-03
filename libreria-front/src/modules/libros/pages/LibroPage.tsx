import React from 'react';
import { useLibros } from '../hooks/useLibros';
import LibroCard from '../components/LibroCard';
import { useNavigate } from 'react-router-dom';
import { useDeleteLibro } from '../hooks/useDeleteLibro';

const LibrosPage: React.FC = () => {
    const { data: libros, isLoading, error, refetch } = useLibros();
    const deleteLibro = useDeleteLibro();
    const navigate = useNavigate();

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

    return (
        <div className="mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Libros</h1>
                <button
                    onClick={() => navigate('/libros/crear')}
                    className="bg-button text-white px-4 py-2 rounded hover:bg-button-hoverProduct transition"
                >
                    Crear nuevo libro
                </button>
            </div>

            {isLoading && <p>Cargando libros...</p>}
            {error && <p className="text-destructive">Error al cargar libros: {error.message}</p>}

            {!isLoading && libros && libros.length === 0 && (
                <p className="text-center text-muted-foreground">No hay libros para mostrar.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {libros?.map(libro => (
                    <LibroCard key={libro.id} libro={libro} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default LibrosPage;
