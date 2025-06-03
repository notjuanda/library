import React from 'react';
import type { IUser } from '../types/auth.types';

interface Props {
    user: IUser | null;
    logout: () => void;
    toggleMobileMenu: () => void;
}

const MobileMenu: React.FC<Props> = ({ user, logout, toggleMobileMenu }) => {
    const handleLogout = () => {
        logout();
        toggleMobileMenu();
    };

    if (!user) {
        return (
        <nav className="bg-gray-800 text-white flex flex-col space-y-2 p-4 md:hidden">
            <a href="/login" onClick={toggleMobileMenu}>
            Iniciar sesión
            </a>
            <a href="/register" onClick={toggleMobileMenu}>
            Registrarse
            </a>
        </nav>
        );
    }

    if (user.is_staff) {
        return (
        <nav className="bg-gray-800 text-white flex flex-col space-y-2 p-4 md:hidden">
            <a href="/usuarios" onClick={toggleMobileMenu}>
            Usuarios
            </a>
            <a href="/libros" onClick={toggleMobileMenu}>
            Libros
            </a>
            <a href="/generos" onClick={toggleMobileMenu}>
            Géneros
            </a>
            <a href="/compras" onClick={toggleMobileMenu}>
            Compras
            </a>
            <a href="/carrito" onClick={toggleMobileMenu}>
            Carrito
            </a>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </nav>
        );
    }

    return (
        <nav className="bg-gray-800 text-white flex flex-col space-y-2 p-4 md:hidden">
        <a href="/libros" onClick={toggleMobileMenu}>
            Libros
        </a>
        <a href="/carrito" onClick={toggleMobileMenu}>
            Carrito
        </a>
        <a href="/perfil" onClick={toggleMobileMenu}>
            Perfil
        </a>
        <button onClick={handleLogout}>Cerrar sesión</button>
        </nav>
    );
};

export default MobileMenu;
