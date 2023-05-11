import { createContext, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';

export const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const ERROR_MESSAGES = {
        'A company with this CNPJ and email already exists': 'Empresa com este CNPJ e email já existe',
        'Descrição é obrigatório': 'Descrição é obrigatório',
        'File is empty': 'Envio do arquivo vazio',
        'User is not active': 'Usuário não está ativo',
        'Document type already exists': 'Número de documento já existe, favor verificar',
        'Email is required': 'Email é obrigatório',
        'User profile already exists': 'Perfil de usuário já existe',
        'Profile name is required': 'Nome do perfil é obrigatório',
        'User profile does not exists': 'Perfil de usuário não existe',
        'User profile is being used by a user': 'Perfil de usuário em uso no sistema',

    };

    //function to update company data
    const updateCompany = async (data) => {
        console.log(data.id_empresa)

        try {
            setLoading(true);
            const response = await api.put('/update/company', data);
            toast.success('Dados atualizados com sucesso!', {
                autoClose: 1000,
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            console.log(error)
            const message = ERROR_MESSAGES[error.response?.data.eror] || 'Erro desconhecido';
            toast.error(message, {
                autoClose: 1000,
                hideProgressBar: true,
            });
            return error
        }
    };

    //function to list roles
    const listRoles = async () => {
        try {
            setLoading(true);
            const response = await api.get('/list/permissions');
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            console.log(error)
            const message = ERROR_MESSAGES[error.response?.data.eror] || 'Erro desconhecido';
            toast.error(message, {
                autoClose: 1000,
                hideProgressBar: true,
            });
            return error
        }
    };

    //function to create User Profile
    const createProfile = async (data) => {
        try {
            setLoading(true);
            const response = await api.post('/create/user/profile', data);
            toast.success('Perfil criado com sucesso!', {
                autoClose: 1000,
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            console.log(error)
            const message = ERROR_MESSAGES[error.response?.data.eror] || 'Erro desconhecido';
            toast.error(message, {
                autoClose: 1000,
                hideProgressBar: true,
            });
            return error
        }
    };

    //function to list User Profile
    const listProfile = async () => {
        try {
            setLoading(true);
            const response = await api.get('/list/user/profile');
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            console.log(error)
            const message = ERROR_MESSAGES[error.response?.data.eror] || 'Erro desconhecido';
            toast.error(message, {
                autoClose: 1000,
                hideProgressBar: true,
            });
            return error
        }
    };

    //function to delete User Profile by id in params
    const deleteProfile = async (id) => {
        try {
            setLoading(true);
            const response = await api.delete(`/delete/user/profile/${id}`);
            toast.success('Perfil deletado com sucesso!', {
                autoClose: 1000,
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            console.log(error)
            const message = ERROR_MESSAGES[error.response?.data.eror] || 'Erro desconhecido';
            toast.error(message, {
              
            });
            return error
        }
    };




    return (
        <RegisterContext.Provider value={{ loading, updateCompany, listRoles, createProfile, listProfile, deleteProfile }}>
            {children}
        </RegisterContext.Provider>


    )
}


