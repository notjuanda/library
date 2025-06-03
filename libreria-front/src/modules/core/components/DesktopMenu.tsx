import React from 'react';
import type { IUser } from '../types/auth.types';

interface Props {
    user: IUser | null;
    logout: () => void;
}

const DesktopMenu: React.FC<Props> = ({ user, logout }) => {
    const baseLinkClasses = "font-cap text-white hover:underline hover:text-highlight transition cursor-pointer";

    if (!user) {
        return (
        <nav className="flex gap-6 items-center bg-header px-6 py-2 rounded-md font-cap text-sm">
            <a href="/login" className={`${baseLinkClasses} bg-red-600 px-4 py-1 rounded-md hover:bg-red-500`}>
            Iniciar sesión
            </a>
            <a href="/register" className={`${baseLinkClasses} bg-red-600 px-4 py-1 rounded-md hover:bg-red-500`}>
            Registrar
            </a>
        </nav>
        );
    }

    if (user.is_staff) {
        return (
        <nav className="flex gap-8 items-center bg-header px-6 py-2 rounded-md font-cap text-sm">
            <a href="/admin/usuarios" className={baseLinkClasses}>
            Usuarios
            </a>
            <a href="/admin" className={baseLinkClasses}>
            Libros
            </a>
            <a href="/admin/generos" className={baseLinkClasses}>
            Géneros
            </a>
            <a href="/admin/ventas" className={baseLinkClasses}>
            Ventas
            </a>
            <button
            onClick={logout}
            className="font-cap text-red-500 hover:text-red-400 underline cursor-pointer bg-transparent border-none p-0"
            type="button"
            >
            Cerrar sesión
            </button>
        </nav>
        );
    }

    return (
        <nav className="flex gap-6 items-center bg-header px-6 py-2 rounded-md font-cap text-sm text-white">
        <a href="/" className={baseLinkClasses}>
            Inicio
        </a>
        <a href="/carrito" className={baseLinkClasses}>
            Carrito
        </a>
        <a href="/perfil" className={baseLinkClasses}>
            Perfil
        </a>
        <button
            onClick={logout}
            className="font-cap text-red-500 hover:text-red-400 underline cursor-pointer bg-transparent border-none p-0"
            type="button"
        >
            Cerrar sesión
        </button>
        </nav>
    );
};

export default DesktopMenu;
