import React from 'react';
import { useRegister } from '../hooks/useRegister';
import RegisterForm from '../components/RegisterForm';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    const { doRegister, loading, error } = useRegister();
    const navigate = useNavigate();

    const handleRegister = async (data: {
        username: string;
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        ci: string;
    }) => {
        try {
        const createdUser = await doRegister(data);
        if (createdUser) {
            navigate('/login');
        }
        } catch {
        }
    };

    return <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />;
};

export default RegisterPage;
