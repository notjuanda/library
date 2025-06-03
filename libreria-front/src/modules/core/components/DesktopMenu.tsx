import React from 'react';
import type { IUser } from '../types/auth.types';

interface Props {
    user: IUser | null;
    logout: () => void;
}

const DesktopMenu: React.FC<Props> = ({ user, logout }) => {
    if (!user) {
        return (
        <>
            <a href="/login" className="hover:text-gray-300">
            Iniciar sesión
            </a>
            <a href="/register" className="hover:text-gray-300">
            Registrarse
            </a>
        </>
        );
    }

    if (user.is_staff) {
        return (
        <>
            <a href="/usuarios" className="hover:text-gray-300">
            Usuarios
            </a>
            <a href="/libros" className="hover:text-gray-300">
            Libros
            </a>
            <a href="/generos" className="hover:text-gray-300">
            Géneros
            </a>
            <a href="/compras" className="hover:text-gray-300">
            Compras
            </a>
            <a href="/carrito" className="hover:text-gray-300">
            Carrito
            </a>
            <button onClick={logout} className="hover:text-gray-300">
            Cerrar sesión
            </button>
        </>
        );
    }

    return (
        <>
        <a href="/libros" className="hover:text-gray-300">
            Libros
        </a>
        <a href="/carrito" className="hover:text-gray-300">
            Carrito
        </a>
        <a href="/perfil" className="hover:text-gray-300">
            Perfil
        </a>
        <button onClick={logout} className="hover:text-gray-300">
            Cerrar sesión
        </button>
        </>
    );
};

export default DesktopMenu;
