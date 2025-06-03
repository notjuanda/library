import React from 'react';
import type { Libro } from '../../core/types/libro.types';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../core/hooks/useAuth';

interface Props {
    libro: Libro;
    onDelete: (id: number) => void;
}

const LibroCard: React.FC<Props> = ({ libro, onDelete }) => {
    const precioNumber = typeof libro.precio === 'string' ? parseFloat(libro.precio) : libro.precio ?? 0;
    const navigate = useNavigate();
    const { user } = useAuth();

    const isAdmin = !!user && user.is_staff === true;

    const handleCardClick = () => {
        navigate(`/libros/${libro.id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="relative border rounded-md p-4 shadow hover:shadow-md transition cursor-pointer"
        >
            <img
                src={libro.foto}
                alt={libro.nombre}
                className="w-full h-48 object-cover rounded-md mb-2"
            />

            {isAdmin && (
                <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                        onClick={e => {
                            e.stopPropagation();
                            navigate(`/libros/editar/${libro.id}`);
                        }}
                        aria-label="Editar libro"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <FiEdit size={20} />
                    </button>

                    <button
                        onClick={e => {
                            e.stopPropagation();
                            onDelete(libro.id);
                        }}
                        aria-label="Eliminar libro"
                        className="text-red-600 hover:text-red-800"
                    >
                        <FiTrash size={20} />
                    </button>
                </div>
            )}

            <h3 className="font-semibold text-lg">{libro.nombre}</h3>
            <p className="text-sm text-muted-foreground">{libro.autor}</p>
            <p className="mt-1 font-bold">${precioNumber.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">
                {libro.generos.map((genero, idx) => (
                    <span key={genero.id}>
                        {genero.nombre}
                        {idx < libro.generos.length - 1 && ', '}
                    </span>
                ))}
            </p>
        </div>
    );
};

export default LibroCard;
