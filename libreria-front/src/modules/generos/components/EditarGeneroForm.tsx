import React, { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import type { Genero } from '../../core/types/genero.types';

interface Props {
    initialData?: Partial<Genero>;
    onSubmit: (data: Partial<Genero>) => Promise<void>;
    loading: boolean;
    error: string | null;
}

const EditarGeneroForm: React.FC<Props> = ({ initialData, onSubmit, loading, error }) => {
    const [nombre, setNombre] = useState(initialData?.nombre || '');

    useEffect(() => {
        setNombre(initialData?.nombre || '');
    }, [initialData]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await onSubmit({ nombre });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow space-y-4">
        <div>
            <label className="block mb-1 font-semibold">Nombre</label>
            <input
            type="text"
            value={nombre}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
            required
            className="w-full border border-border rounded px-3 py-2"
            />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button
            type="submit"
            disabled={loading}
            className="bg-button text-white px-4 py-2 rounded hover:bg-button-hoverProduct transition"
        >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
        </form>
    );
};

export default EditarGeneroForm;
