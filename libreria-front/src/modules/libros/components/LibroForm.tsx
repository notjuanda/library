import React, { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import type { Libro } from '../../core/types/libro.types';
import GeneroSelect from './GeneroSelect';

interface Props {
    initialData?: Partial<Libro>;
    onSubmit: (data: Partial<Libro>, file?: File) => Promise<void>;
    loading: boolean;
    error: string | null;
}

const LibroForm: React.FC<Props> = ({ initialData, onSubmit, loading, error }) => {
    const [nombre, setNombre] = useState(initialData?.nombre || '');
    const [autor, setAutor] = useState(initialData?.autor || '');
    const [precio, setPrecio] = useState(initialData?.precio?.toString() || '');
    const [isbn, setIsbn] = useState(initialData?.isbn || '');
    const [descripcion, setDescripcion] = useState(initialData?.descripcion || '');
    const [fotoFile, setFotoFile] = useState<File | undefined>(undefined);
    const [generosIds, setGenerosIds] = useState<number[]>(initialData?.generos?.map(g => g.id) || []);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setFotoFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const parsedPrecio = parseFloat(precio);
        if (isNaN(parsedPrecio)) {
            alert('Por favor ingresa un precio válido');
            return;
        }

        // Convertir explícitamente los generosIds a números para evitar errores en el backend
        const libroData: Partial<Libro> = {
            nombre,
            autor,
            precio: parsedPrecio,
            isbn,
            descripcion,
            ...(generosIds.length > 0 ? { generos_ids: generosIds.map(id => Number(id)) } : {}),
        };

        await onSubmit(libroData, fotoFile);
    };

    useEffect(() => {
        setNombre(initialData?.nombre || '');
        setAutor(initialData?.autor || '');
        setPrecio(initialData?.precio?.toString() || '');
        setIsbn(initialData?.isbn || '');
        setDescripcion(initialData?.descripcion || '');
        setGenerosIds(initialData?.generos?.map(g => g.id) || []);
    }, [initialData]);

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow space-y-4">
            <div>
                <label className="block mb-1 font-semibold">Nombre</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    required
                    className="w-full border border-border rounded px-3 py-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Autor</label>
                <input
                    type="text"
                    value={autor}
                    onChange={e => setAutor(e.target.value)}
                    required
                    className="w-full border border-border rounded px-3 py-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Precio</label>
                <input
                    type="number"
                    step="0.01"
                    value={precio}
                    onChange={e => setPrecio(e.target.value)}
                    required
                    className="w-full border border-border rounded px-3 py-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold">ISBN</label>
                <input
                    type="text"
                    value={isbn}
                    onChange={e => setIsbn(e.target.value)}
                    required
                    className="w-full border border-border rounded px-3 py-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Descripción</label>
                <textarea
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                    required
                    rows={4}
                    className="w-full border border-border rounded px-3 py-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Géneros</label>
                <GeneroSelect selectedIds={generosIds} onChange={setGenerosIds} />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Foto</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            {error && <p className="text-destructive">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="bg-button text-white px-4 py-2 rounded hover:bg-button-hoverProduct transition"
            >
                {loading ? 'Guardando...' : 'Guardar'}
            </button>
        </form>
    );
};

export default LibroForm;
