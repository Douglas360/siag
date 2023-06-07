import { createContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from '../../config/ErrorMessage';

export const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const handleRequest = async (requestPromise) => {
        try {
            setLoading(true);
            const response = await requestPromise;
            return response.data;
        } catch (error) {
            const message =
                ERROR_MESSAGES[error.response?.data.eror] || 'Erro desconhecido';
            toast.error(message, {
                autoClose: 2000,
                hideProgressBar: true,
            });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // useEffect to list roles when the page is loaded
    useEffect(() => {
        listRoles();
    }, []);

    // function to update company data
    const updateCompany = async (data) => {
        try {
            setLoading(true);
            const response = await api.put('/update/company', data);
            toast.success('Dados atualizados com sucesso!', {
                autoClose: 2000,
            });
            return response.data;
        } catch (error) {
            const message =
                ERROR_MESSAGES[error.response?.data.error] || 'Erro desconhecido';
            toast.error(message, {
                autoClose: 2000,
                hideProgressBar: true,
            });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // function to list roles
    const listRoles = async () => {
        return handleRequest(api.get('/list/permissions')).then((response) =>
            setRoles(response)
        );
    };

    // function to create User Profile
    const createProfile = async (data) => {
        return handleRequest(api.post('/create/user/profile', data)).then(
            (response) => {
                toast.success('Perfil criado com sucesso!', {
                    autoClose: 2000,
                });
                return response;
            }
        );
    };

    // function to list User Profile
    const listProfile = async () => {
        return handleRequest(api.get('/list/user/profile'));
    };

    // function to update User Profile by id in params
    const updateProfile = async (data) => {
        return handleRequest(
            api.put(`/update/user/profile/${data.id}`, data)
        ).then((response) => {
            toast.success('Perfil atualizado com sucesso!', {
                autoClose: 2000,
            });
            return response;
        });
    };

    // function to list User Profile by id in params
    const listProfileById = async (id) => {
        return handleRequest(api.get(`/list/user/profile/${id}`));
    };

    // function to delete User Profile by id in params
    const deleteProfile = async (id) => {
        return handleRequest(api.delete(`/delete/user/profile/${id}`)).then(
            (response) => {
                toast.success('Perfil deletado com sucesso!', {
                    autoClose: 2000,
                });
                return response;
            }
        );
    };

    // function to create User Group
    const createUserGroup = async (data) => {
        return handleRequest(api.post('/create/user/group', data)).then(
            (response) => {
                toast.success('Grupo criado com sucesso!', {
                    autoClose: 2000,
                });
                return response;
            }
        );
    };

    // function to list User Group
    const listUserGroup = async () => {
        return handleRequest(api.get('/list/user/group'));
    };

    //function to list User inside a User Group by id in params
    const listUserInsideUserGroup = async (id) => {
        return handleRequest(api.get(`/list/users/inside/group/${id}`));
    };

    // function to update User Group by id in params
    const updateUserGroup = async (data) => {
        console.log(data)
        return handleRequest(
            api.put(`/update/user/group/${data.id}`, data)
        ).then((response) => {
            toast.success('Grupo atualizado com sucesso!', {
                autoClose: 2000,
            });
            return response;
        });
    };

    // function to delete User Group by id in params
    const deleteUserGroup = async (id) => {
        return handleRequest(api.delete(`/delete/user/group/${id}`)).then(
            (response) => {
                toast.success('Grupo deletado com sucesso!', {
                    autoClose: 2000,
                });
                return response;
            }
        );
    };

    // function to create User
    const createUser = async (data) => {
        return handleRequest(api.post('/create/user', data)).then((response) => {
            toast.success('Usuário criado com sucesso!', {
                autoClose: 2000,
            });
            return response;
        });
    };

    // function to check if login already exists
    const checkLogin = async (data) => {
        return handleRequest(api.post(`/check/login/`, data));
    };

    // function to list users linked to a company
    const listUsers = async (data) => {
        return handleRequest(api.post('/list/users', data));
    };

    // function to list user by id in params
    const listUserById = async (id) => {
        return handleRequest(api.post(`/list/user/${id}`));
    };


    // function to update User by id in params
    const updateUser = async (data, id) => {
       
        return handleRequest(api.put(`/update/user/${id}`, data)).then(
            (response) => {
                toast.success('Usuário atualizado com sucesso!', {
                    autoClose: 2000,
                });
                return response;
            }
        );
    };

    // function to update User Status by id in params
    const updateUserStatus = async (id, status) => {
       
        return handleRequest(api.put(`/update/user/status/${id}`, status)).then(
            (response) => {
                toast.success('Usuário atualizado com sucesso!', {
                    autoClose: 2000,
                });
                return response;
            }
        );
    };


    //function to delete User by id in params
    const deleteUser = async (id) => {
        return handleRequest(api.delete(`/delete/user/${id}`)).then(
            (response) => {
                toast.success('Usuário deletado com sucesso!', {
                    autoClose: 2000,
                });
                return response;
            }
        );
    };



    // function to create JobName
    const createJobName = async (data) => {
        return handleRequest(api.post('/create/job/name', data)).then(
            (response) => {
                toast.success('Cargo criado com sucesso!', {
                    autoClose: 1000,
                });
                return response;
            }
        );
    };

    // function to list JobName linked to a company
    const listJobName = async (data) => {
        return handleRequest(
            api.get(`/list/job/name/id_company/${data}`))
    };

    // function to update JobName by id in params
    const updateJobName = async (data) => {
        try {
            setLoadingUpdate(true);
            const response = await handleRequest(
                api.put(`/update/job/name/${data.id_cargo}`, data)
            );
            toast.success('Cargo atualizado com sucesso!', {
                autoClose: 1000,
            });
            return response.data;
        } catch (error) {
            const message =
                ERROR_MESSAGES[error.response?.data.eror] || 'Erro desconhecido';
            toast.error(message, {
                autoClose: 1000,
                hideProgressBar: true,
            });
            throw error;
        } finally {
            setLoadingUpdate(false);
        }
    };

    // function to delete JobName by id in params
    const deleteJobName = async (id) => {
        try {
            setLoadingUpdate(true);
            const response = await handleRequest(api.delete(`/delete/job/name/${id}`));
            toast.success('Cargo deletado com sucesso!', {
                autoClose: 2000,
            });
            return response.data;
        } catch (error) {
            const message =
                ERROR_MESSAGES[error.response?.data.eror] || 'Erro desconhecido';
            toast.error(message, {
                autoClose: 2000,
                hideProgressBar: true,
            });
            throw error;
        } finally {
            setLoadingUpdate(false);
        }
    };

    return (
        <RegisterContext.Provider
            value={{
                loading,
                loadingUpdate,
                updateCompany,
                roles,
                createProfile,
                listProfile,
                deleteProfile,
                updateProfile,
                listProfileById,
                createUserGroup,
                listUserGroup,
                listUserInsideUserGroup,
                deleteUserGroup,
                updateUserGroup,
                createUser,
                deleteUser,
                updateUserStatus,
                listUserById,
                updateUser,
                checkLogin,
                listUsers,
                createJobName,
                listJobName,
                updateJobName,
                deleteJobName,
            }}
        >
            {children}
        </RegisterContext.Provider>
    );
};
