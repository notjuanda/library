import React from 'react';
import { useUsuarios } from '../hooks/useUsuarios';
import UsuarioCard from '../components/UsuarioCard';

const UsuariosPage: React.FC = () => {
    const { data: usuarios, isLoading, error } = useUsuarios();

    return (
        <div className="mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Usuarios</h1>

        {isLoading && <p>Cargando usuarios...</p>}
        {error && <p className="text-destructive">Error al cargar usuarios: {error.message}</p>}

        {!isLoading && usuarios && usuarios.length === 0 && (
            <p className="text-center text-muted-foreground">No hay usuarios para mostrar.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {usuarios?.map(usuario => (
            <UsuarioCard key={usuario.id} usuario={usuario} />
            ))}
        </div>
        </div>
    );
};

export default UsuariosPage;
