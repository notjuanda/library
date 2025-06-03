import React from 'react';
import LoginForm from '../components/LoginForm';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const { doLogin, loading, error } = useLogin();
    const navigate = useNavigate();

    const handleLogin = async (data: { username: string; password: string }) => {
        try {
        const loggedUser = await doLogin(data);
        navigate(loggedUser?.is_staff ? '/admin' : '/');
        } catch {
        }
    };

    return (
        <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
    );
};

export default LoginPage;
