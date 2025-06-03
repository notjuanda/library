import React from 'react';
import { useGeneros } from '../hooks/useGeneros';

interface Props {
    selectedIds: number[];
    onChange: (ids: number[]) => void;
}

const GeneroSelect: React.FC<Props> = ({ selectedIds, onChange }) => {
    const { data: generos, isLoading } = useGeneros();

    if (isLoading) return <p>Cargando géneros...</p>;
    if (!generos) return <p>No se encontraron géneros.</p>;

    const toggleGenero = (id: number) => {
        if (selectedIds.includes(id)) {
        onChange(selectedIds.filter(gid => gid !== id));
        } else {
        onChange([...selectedIds, id]);
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
        {generos.map(g => (
            <button
            key={g.id}
            type="button"
            onClick={() => toggleGenero(g.id)}
            className={`px-3 py-1 rounded border ${
                selectedIds.includes(g.id) ? 'bg-button text-white' : 'bg-white text-black'
            }`}
            >
            {g.nombre}
            </button>
        ))}
        </div>
    );
};

export default GeneroSelect;
