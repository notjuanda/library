import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateGenero } from '../hooks/useCreateGenero';

const CrearGeneroPage: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const navigate = useNavigate();
    const { mutateAsync, isPending, error } = useCreateGenero();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre.trim()) return;

        try {
        await mutateAsync({ nombre: nombre.trim() });
        navigate('/admin/generos');
        } catch {
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-8">
        <h1 className="text-2xl font-bold mb-4">Crear nuevo género</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block mb-1 font-semibold">Nombre</label>
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border border-border rounded px-3 py-2"
                placeholder="Nombre del género"
                required
            />
            </div>

            {error && (
            <p className="text-red-600">
                {(error as Error).message || 'Error creando género'}
            </p>
            )}

            <button
            type="submit"
            disabled={isPending}
            className="bg-button text-white px-4 py-2 rounded hover:bg-button-hoverProduct transition"
            >
            {isPending ? 'Creando...' : 'Crear Género'}
            </button>
        </form>
        </div>
    );
};

export default CrearGeneroPage;
