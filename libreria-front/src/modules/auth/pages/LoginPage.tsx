import React from 'react';
import LoginForm from '../components/LoginForm';
import { useLogin } from '../hooks/useLogin';

const LoginPage: React.FC = () => {
    const { doLogin, loading, error } = useLogin();

    const handleLogin = async (data: { username: string; password: string }) => {
        try {
        await doLogin(data);
        // Aquí redirigir a dashboard o home usando react-router o similar
        } catch {
        // Error manejado en hook
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-header to-button flex items-center justify-center px-4">
        <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
        </div>
    );
};

export default LoginPage;
