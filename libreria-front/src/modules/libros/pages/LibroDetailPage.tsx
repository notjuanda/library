import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLibro } from '../../core/api/libro.api';
import type { Libro } from '../../core/types/libro.types';
import { useAuth } from '../../core/hooks/useAuth';
import { useAddCarritoItem } from '@/modules/carrito/hooks/useAddCarritoItem';

const LibroDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [libro, setLibro] = useState<Libro | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const { user, loading: authLoading } = useAuth();

    const addCarritoItemMutation = useAddCarritoItem();

    const precioNumber =
        libro
            ? (typeof libro.precio === 'string'
                ? parseFloat(libro.precio)
                : typeof libro.precio === 'number'
                    ? libro.precio
                    : 0)
            : 0;

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        getLibro(Number(id))
            .then(data => setLibro(data))
            .finally(() => setLoading(false));
    }, [id]);

    const handleComprar = () => {
        if (!libro) return;
        setErrorMsg(null); 
        addCarritoItemMutation.mutate(
            { libro_id: libro.id, cantidad: 1 },
            {
                onSuccess: () => {
                    navigate('/carrito');
                },
                onError: (error: any) => {
                    setErrorMsg(
                        error?.response?.data?.error ||
                        'Error al agregar al carrito. Intenta de nuevo.'
                    );
                },
            }
        );
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-lg text-muted-foreground">Cargando libro...</p>
            </div>
        );

    if (!libro)
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-lg text-red-600">Libro no encontrado.</p>
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900">{libro.nombre}</h1>

            <div className="flex flex-col md:flex-row gap-8">
                <img
                    src={libro.foto}
                    alt={libro.nombre}
                    className="w-full md:w-1/3 max-h-96 object-contain rounded-lg shadow-md"
                />

                <div className="md:flex-1 flex flex-col justify-between">
                    <div>
                        <p className="text-lg mb-2">
                            <span className="font-semibold text-gray-700">Autor:</span> {libro.autor}
                        </p>
                        <p className="text-lg mb-2 font-bold text-green-700">
                            Precio: ${precioNumber.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                            <span className="font-semibold">ISBN:</span> {libro.isbn}
                        </p>
                        <p className="text-gray-800 leading-relaxed">{libro.descripcion}</p>
                    </div>

                    <p className="mt-6 text-sm text-gray-500 italic">
                        <span className="font-semibold">Géneros:</span> {libro.generos.map(g => g.nombre).join(', ') || 'Sin géneros asignados'}
                    </p>

                    {errorMsg && (
                        <p className="mt-4 text-red-600 font-semibold">{errorMsg}</p>
                    )}

                    {!authLoading && user && (
                        <button
                            className="mt-8 w-full bg-button text-white py-3 rounded-lg text-lg font-semibold hover:bg-button-hoverProduct transition disabled:opacity-50"
                            onClick={handleComprar}
                            disabled={addCarritoItemMutation.isPending}
                            aria-label="Comprar libro"
                        >
                            {addCarritoItemMutation.isPending ? 'Agregando...' : 'Comprar'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LibroDetailPage;
