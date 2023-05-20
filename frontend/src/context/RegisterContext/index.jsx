import { createContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';

export const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    //useEffect to list roles when the page is loaded 
    useEffect(() => {
        listRoles();

    }, []);


    const ERROR_MESSAGES = {
        'A company with this CNPJ and email already exists': 'Empresa com este CNPJ e email já existe',
        'Descrição é obrigatório': 'Descrição é obrigatório',
        'File is empty': 'Envio do arquivo vazio',
        'Name is required': 'Nome é obrigatório',
        'User is not active': 'Usuário não está ativo',
        'Document type already exists': 'Número de documento já existe, favor verificar',
        'Email is required': 'Email é obrigatório',
        'User profile already exists': 'Perfil de usuário já existe',
        'Profile name is required': 'Nome do perfil é obrigatório',
        'User profile does not exists': 'Perfil de usuário não existe',
        'User profile is being used by a user': 'Perfil de usuário em uso no sistema',
        'Group name is required': 'Nome do grupo é obrigatório',
        'Group id is required': 'Id do grupo é obrigatório',
        'User group does not exists': 'Grupo de usuário não existe',
        'User group deleted successfully': 'Grupo de usuário deletado com sucesso',
        'User group already exists': 'Grupo de usuário já existe',
        'User with this email already exists': 'Usuário com este email já existe',
        'User with this login already exists': 'Usuário com este login já existe',


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
            setRoles(response.data)
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

    //function to update User Profile by id in params
    const updateProfile = async (data) => {
        try {

            setLoadingUpdate(true);
            const response = await api.put(`/update/user/profile/${data.id}`, data);
            toast.success('Perfil atualizado com sucesso!', {
                autoClose: 1000,
            });
            setLoadingUpdate(false);
            return response.data;

        } catch (error) {
            setLoadingUpdate(false);
            console.log(error)
            const message = ERROR_MESSAGES[error.response?.data.eror] || 'Erro desconhecido';
            toast.error(message, {
                autoClose: 1000,
                hideProgressBar: true,
            });
            return error

        }
    };

    //function to list User Profile by id in params
    const listProfileById = async (id) => {
        try {
            setLoading(true);
            const response = await api.get(`/list/user/profile/${id}`);
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

    //function to create User Group
    const createUserGroup = async (data) => {
        try {
            setLoading(true);
            const response = await api.post('/create/user/group', data);
            toast.success('Grupo criado com sucesso!', {
                autoClose: 1000,
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            //console.log(error)
            const message = ERROR_MESSAGES[error.response?.data.error] || 'Erro desconhecido';
            toast.error(message, {
                autoClose: 1000,
                hideProgressBar: true,
            });
            return error
        }
    };

    //function to list User Group
    const listUserGroup = async () => {
        try {
            setLoading(true);
            const response = await api.get('/list/user/group');
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

    //function to update User Group by id in params
    const updateUserGroup = async (data) => {
        try {

            setLoadingUpdate(true);
            const response = await api.put(`/update/user/group/${data.id}`, data);
            toast.success('Grupo atualizado com sucesso!', {
                autoClose: 1000,
            });
            await listUserGroup();
            setLoadingUpdate(false);
            return response.data;

        } catch (error) {
            setLoadingUpdate(false);

            const message = ERROR_MESSAGES[error.response?.data.error] || 'Erro desconhecido';
            toast.error(message, {
                autoClose: 1000,
                hideProgressBar: true,
            });
            return error

        }
    };

    //function to delete User Group by id in params
    const deleteUserGroup = async (id) => {
        try {
            setLoading(true);
            const response = await api.delete(`/delete/user/group/${id}`);
            toast.success('Grupo deletado com sucesso!', {
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

    //function to create User
    const createUser = async (data) => {
        //console.log(data.id_empresa)
        try {
            setLoading(true);

            const response = await api.post('/create/user', data);
            toast.success('Usuário criado com sucesso!', {
                autoClose: 1000,
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            //console.log(error)
            const message = ERROR_MESSAGES[error.response?.data.eror] || 'Erro desconhecido';

            toast.error(message, {
                autoClose: 1000,
                hideProgressBar: true,
            });
            return error
        }
    };

    //function to check if login already exists
    const checkLogin = async (data) => {
       
        try {
            setLoadingUpdate(true);
            const response = await api.post(`/check/login/`, data);
            setLoadingUpdate(false);
            return response.data;
        } catch (error) {
            setLoadingUpdate(false);
            //console.log(error)
            const message = ERROR_MESSAGES[error.response?.data.eror] || 'Erro desconhecido';

            toast.error(message, {
                autoClose: 1000,
                hideProgressBar: true,
            });
            return error
        }
    };

    //function to list use linked to a company
    const listUsers = async (id_empresa) => {
        try {
            setLoading(true);
            const response = await api.post('/list/users', id_empresa);
            setLoading(false);
            console.log(response.data)
            return response.data;
        } catch (error) {
            setLoading(false);
            //console.log(error)
            const message = ERROR_MESSAGES[error.response?.data.eror] || 'Erro desconhecido';

            toast.error(message, {
                autoClose: 1000,
                hideProgressBar: true,
            });
            return error
        }
    };


    return (
        <RegisterContext.Provider value={{ loading, loadingUpdate, updateCompany, roles, createProfile, listProfile, deleteProfile, updateProfile, listProfileById, createUserGroup, listUserGroup, deleteUserGroup, updateUserGroup, createUser, checkLogin, listUsers }}>
            {children}
        </RegisterContext.Provider>


    )
}


