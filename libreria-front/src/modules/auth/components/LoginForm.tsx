import React, { useState } from 'react';
import type { ILoginPayload } from '../types/auth.types';
import { FaBreadSlice } from 'react-icons/fa';

interface Props {
    onSubmit: (data: ILoginPayload) => Promise<void>;
    loading: boolean;
    error: string | null;
}

const LoginForm: React.FC<Props> = ({ onSubmit, loading, error }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({ username, password });
    };

    return (
        <div className="flex min-h-screen font-cap bg-background text-foreground">
        <div className="w-1/2 bg-header flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-white flex items-center justify-center shadow-lg">
                <FaBreadSlice className="text-6xl text-header" />
            </div>
            <p className="mt-4 text-white text-lg font-cap-medium">Librería</p>
            </div>
        </div>

        <div className="w-1/2 bg-highlight flex items-center justify-center px-6">
            <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-4"
            >
            <h2 className="text-2xl font-cap-medium mb-4 text-center text-header">¡Bienvenido de nuevo!</h2>

            <div>
                <label htmlFor="username" className="block text-sm font-cap-link text-header mb-1">Correo Electrónico</label>
                <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-black placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-button"
                placeholder="ingrese correo electrónico"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-cap-link text-header mb-1">Contraseña</label>
                <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-black placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-button"
                placeholder="Tu contraseña"
                />
            </div>

            {error && (
                <p className="text-sm text-destructive font-cap-link text-center">{error}</p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-button hover:bg-button-hoverProduct text-white font-cap-link py-2 rounded-md transition-colors"
            >
                {loading ? 'Cargando...' : 'Continuar'}
            </button>

            <div className="flex items-center justify-center my-4">
                <hr className="flex-grow border-t border-muted" />
                <span className="mx-2 text-sm text-header">o crear cuenta</span>
                <hr className="flex-grow border-t border-muted" />
            </div>

            <div className="text-center mt-4 text-sm">
                <a href="/register" className="text-header underline font-cap-link">¿Eres nuevo? Crea una cuenta</a>
            </div>
            </form>
        </div>
        </div>
    );
};

export default LoginForm;
