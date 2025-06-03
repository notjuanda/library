import React, { useState } from 'react';
import type { ILoginPayload } from '../types/auth.types';

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
        <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-8 mt-12 bg-card dark:bg-card-foreground rounded-lg shadow-lg"
        style={{ fontFamily: "'Source Code Pro', sans-serif" }}
        >
        <h2 className="text-2xl font-cap-medium mb-6 text-center text-foreground dark:text-primary-foreground">
            Iniciar sesión
        </h2>

        <label
            htmlFor="username"
            className="block text-sm font-cap-link text-muted-foreground dark:text-muted"
        >
            Usuario
        </label>
        <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="mt-1 mb-4 block w-full rounded-md border border-border bg-input px-3 py-2 placeholder-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-button focus:border-button dark:bg-muted dark:border-muted-foreground dark:text-foreground"
            placeholder="Tu usuario"
        />

        <label
            htmlFor="password"
            className="block text-sm font-cap-link text-muted-foreground dark:text-muted"
        >
            Contraseña
        </label>
        <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="mt-1 mb-6 block w-full rounded-md border border-border bg-input px-3 py-2 placeholder-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-button focus:border-button dark:bg-muted dark:border-muted-foreground dark:text-foreground"
            placeholder="Tu contraseña"
        />

        {error && (
            <p className="mb-4 text-sm text-destructive-foreground dark:text-destructive">{error}</p>
        )}

        <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-button text-white py-2 font-cap-link hover:bg-button-hoverProduct disabled:opacity-50 transition-colors"
        >
            {loading ? 'Cargando...' : 'Entrar'}
        </button>
        </form>
    );
};

export default LoginForm;
