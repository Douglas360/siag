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

    return (
        <RegisterContext.Provider value={{ updateCompany, loading }}>
            {children}
        </RegisterContext.Provider>


    )
}

