import React from 'react';
import { useGeneros } from '../hooks/useGeneros';
import { useNavigate } from 'react-router-dom';

const GenerosList: React.FC = () => {
    const { data: generos, isLoading, error } = useGeneros();
    const navigate = useNavigate();

    if (isLoading) {
        return <p>Cargando géneros...</p>;
    }

    if (error) {
        return <p className="text-destructive">Error al cargar géneros: {error.message}</p>;
    }

    if (!generos || generos.length === 0) {
        return <p>No hay géneros disponibles.</p>;
    }

    return (
        <div className="p-4 bg-white rounded shadow max-w-full">
            <h2 className="text-xl font-bold mb-4">Géneros disponibles</h2>
            <ul className="flex flex-nowrap space-x-4 list-none p-0 m-0 overflow-auto">
                {generos.map(genero => (
                    <li key={genero.id} className="text-gray-700 whitespace-nowrap">
                        <button
                            onClick={() => navigate(`/generos/${genero.id}/libros`)}
                            className="hover:underline focus:outline-none"
                        >
                            {genero.nombre}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GenerosList;
