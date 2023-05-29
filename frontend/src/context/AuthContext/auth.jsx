import { createContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ERROR_MESSAGES } from '../../config/ErrorMessage';

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

    //function to login
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
            //console.log(userData)

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

    //function to logout
    const signOut = () => {
        setUser(null);
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    };


    return (
        <AuthContext.Provider value={{ user, setUser, signIn, signOut, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
