import { createContext, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';

export const AdministrativeContext = createContext();
const ERROR_MESSAGES = {
    'Document type not found': 'Modelo de documento não encontrado',
    'Descrição é obrigatório': 'Descrição é obrigatório',
    'File is empty': 'Envio do arquivo vazio',
    'User is not active': 'Usuário não está ativo',
    'Document type already exists': 'Número de documento já existe, favor verificar',
};


export const AdministrativeProvider = ({ children }) => {


    const [loading, setLoading] = useState(false);

    //Function to create a document type in the database
    const createDocumentType = async (data) => {
        //console.log(data.id_user)
        try {
            setLoading(true);
            const response = await api.post('/create/document/type', data);
            //toast.success('Documento cadastrado com sucesso!', { position: toast.POSITION.TOP_RIGHT });
            toast.success('Tipo de documento criado com sucesso!', {
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

    //Function to list all document types in the database
    const listDocumentType = async () => {
        try {
            setLoading(true);
            const response = await api.get('/read/document/type');
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
        <AdministrativeContext.Provider value={{ createDocumentType, listDocumentType, loading }}>
            {children}
        </AdministrativeContext.Provider>
    )
}
