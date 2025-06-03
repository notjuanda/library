import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import type { Genero } from '../../core/types/genero.types';

interface Props {
    genero: Genero;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

const GeneroCard: React.FC<Props> = ({ genero, onDelete, onEdit }) => {
    return (
        <div className="border rounded p-4 shadow flex justify-between items-center">
        <span>{genero.nombre}</span>
        <div className="flex gap-2">
            <button
            onClick={() => onEdit(genero.id)}
            aria-label="Editar género"
            className="text-blue-600 hover:text-blue-800"
            type="button"
            >
            <FaEdit size={18} />
            </button>
            <button
            onClick={() => {
                if (window.confirm(`¿Eliminar género "${genero.nombre}"?`)) {
                onDelete(genero.id);
                }
            }}
            aria-label="Eliminar género"
            className="text-red-600 hover:text-red-800"
            type="button"
            >
            <FaTrash size={18} />
            </button>
        </div>
        </div>
    );
};

export default GeneroCard;
