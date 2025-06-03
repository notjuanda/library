import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import GeneroSelect from './GeneroSelect';

interface Props {
    onSubmit: (data: {
        nombre: string;
        autor: string;
        precio: number;
        isbn: string;
        descripcion: string;
        generos_ids?: number[];
        foto?: File | null;
    }) => void;
    loading: boolean;
    error: string | null;
}

const CrearLibroForm: React.FC<Props> = ({ onSubmit, loading, error }) => {
    const [nombre, setNombre] = useState('');
    const [autor, setAutor] = useState('');
    const [precio, setPrecio] = useState<number | ''>('');
    const [isbn, setIsbn] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [foto, setFoto] = useState<File | null>(null);
    const [generosIds, setGenerosIds] = useState<number[]>([]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFoto(e.target.files[0]);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (precio === '') return;

        const dataToSend = {
            nombre,
            autor,
            precio,
            isbn,
            descripcion,
            ...(generosIds.length > 0 ? { generos_ids: generosIds } : {}),
            foto,
        };

        onSubmit(dataToSend);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow space-y-4">
            <div>
                <label className="block mb-1 font-semibold">Nombre</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    required
                    className="w-full border border-border rounded px-3 py-2"
                    placeholder="Nombre del libro"
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
                    placeholder="Autor del libro"
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Precio</label>
                <input
                    type="number"
                    value={precio}
                    onChange={e => setPrecio(Number(e.target.value))}
                    required
                    min={0}
                    step="0.01"
                    className="w-full border border-border rounded px-3 py-2"
                    placeholder="Precio en USD"
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
                    placeholder="Código ISBN"
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Descripción</label>
                <textarea
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                    required
                    className="w-full border border-border rounded px-3 py-2"
                    rows={4}
                    placeholder="Descripción del libro"
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Géneros</label>
                <GeneroSelect selectedIds={generosIds} onChange={setGenerosIds} />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Foto</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full"
                />
            </div>

            {error && <p className="text-destructive">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="bg-button text-white px-4 py-2 rounded hover:bg-button-hoverProduct transition"
            >
                {loading ? 'Creando...' : 'Crear Libro'}
            </button>
        </form>
    );
};

export default CrearLibroForm;
