import React from 'react';
import { useParams } from 'react-router-dom';
import LibrosPorGenero from '../components/LibrosPorGenero';

const LibrosPorGeneroPage: React.FC = () => {
    const { generoId } = useParams<{ generoId: string }>();

    const id = Number(generoId);

    if (isNaN(id)) return <p>ID de género inválido</p>;

    return <LibrosPorGenero generoId={id} />;
};

export default LibrosPorGeneroPage;
