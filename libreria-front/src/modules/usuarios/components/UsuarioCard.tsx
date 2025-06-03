import React from 'react';
import type { Usuario } from '../../core/types/usuario.types';

interface Props {
    usuario: Usuario;
}

const UsuarioCard: React.FC<Props> = ({ usuario }) => {
    return (
        <div className="border rounded-md p-4 shadow hover:shadow-md transition cursor-pointer">
        <h3 className="font-semibold text-lg">{usuario.username}</h3>
        <p className="text-sm">{usuario.first_name} {usuario.last_name}</p>
        <p className="text-sm text-muted-foreground">{usuario.email}</p>
        <p className="text-sm">CI: {usuario.ci}</p>
        <p className={`text-sm font-semibold ${usuario.is_staff ? 'text-green-600' : 'text-gray-600'}`}>
            {usuario.is_staff ? 'Admin' : 'Usuario'}
        </p>
        </div>
    );
};

export default UsuarioCard;
