import { createContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ERROR_MESSAGES = {
    'User not found': 'Usuário não encontrado',
    'Email/Password incorrect': 'E-mail ou senha incorretos',
    'Company is not active': 'A empresa não está ativa',
    'User is not active': 'Usuário não está ativo',
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const isAuthenticated = !!user;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const { user: storagedUser, token: storagedToken } = localStorage;
        const { user: sessionUser, token: sessionToken } = sessionStorage;

        if (storagedUser && storagedToken) {
            setUser(JSON.parse(storagedUser));
            api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
        }

        if (sessionUser && sessionToken) {
            setUser(JSON.parse(sessionUser));
            api.defaults.headers['Authorization'] = `Bearer ${sessionToken}`;
        }
    }, []);

    const signIn = async (data) => {
        setLoading(true);


        try {
            const response = await api.post('/auth/user', data);
            const { token, ...userData } = response.data;

            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            setUser({ token, ...userData });

            sessionStorage.setItem('user', JSON.stringify(userData));
            sessionStorage.setItem('token', token);

            if (data.rememberMe) {
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('token', token);
            } else {
                sessionStorage.setItem('user', JSON.stringify(userData));
                sessionStorage.setItem('token', token);
            }

            toast.success('Login realizado com sucesso!', {
                autoClose: 1000,
                onClose: () => navigate('/dashboards/basic'),
                hideProgressBar: true,
            });

            setLoading(false);
        } catch (error) {
            setLoading(false);
            const message = ERROR_MESSAGES[error.response?.data?.eror] || 'Erro desconhecido';

            toast.error(message, {
                autoClose: 1000,
            });
        }
    };

    

    return (
        <AuthContext.Provider value={{ user, setUser, signIn, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
