import React from 'react';
import { useTop10Libros } from '../hooks/useTop10Libros';
import { useLibros } from '../hooks/useLibros';
import LibroCard from '../components/LibroCard';
import GenerosList from '../components/GenerosList';

interface Props {
    onDelete: (id: number) => void;
}

const LibrosMasVendidosYListado: React.FC<Props> = ({ onDelete }) => {
    const { data: top10Libros, isLoading: isLoadingTop10, error: errorTop10 } = useTop10Libros();
    console.log("Top 10 Libros:", top10Libros);
    const { data: libros, isLoading: isLoadingLibros, error: errorLibros } = useLibros();

    if (isLoadingTop10 || isLoadingLibros) {
        return <p>Cargando libros...</p>;
    }

    if (errorTop10) {
        return <p className="text-destructive">Error cargando libros más vendidos: {errorTop10.message}</p>;
    }

    if (errorLibros) {
        return <p className="text-destructive">Error cargando libros: {errorLibros.message}</p>;
    }

    const topVendidosValidos = top10Libros ?? [];


    return (
        <>
            <div className='flex justify-center flex-wrap gap-6'>
                <GenerosList />
            </div>  
            <div className="space-y-8">
                {topVendidosValidos.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Los 10 más vendidos</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {topVendidosValidos.map(libro => (
                            <LibroCard key={libro.id} libro={libro} onDelete={onDelete} />
                        ))}
                        </div>
                    </section>
                )}

            </div>
            <section>
                <h2 className="text-2xl font-bold mb-4">Todos los libros</h2>
                {Array.isArray(libros) && libros.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {libros.map(libro => (
                            <LibroCard key={libro.id} libro={libro} onDelete={onDelete} />
                        ))}
                    </div>
                ) : (
                    <p>No hay libros para mostrar.</p>
                )}
            </section>
        </>
    );
};

export default LibrosMasVendidosYListado;
