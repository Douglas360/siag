import { createContext, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from '../../config/ErrorMessage';

export const AdministrativeContext = createContext();



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

    //Function to create official document in the database
    const createOfficialDocument = async (data) => {

        try {
            setLoading(true);
            const response = await api.post('/create/official/document', data);
            toast.success('Documento oficial criado com sucesso!', {
                autoClose: 1000,

            });

            return response.data;
        } catch (error) {

            console.log(error)
            const message = ERROR_MESSAGES[error.response?.data.eror] || 'Erro desconhecido';
            toast.error(message, {
                autoClose: 1000,
                hideProgressBar: true,
            });

            throw error
        } finally {
            setLoading(false);
        }
    };

    //Function to list all official documents in the database
    const listOfficialDocument = async () => {
        try {
            setLoading(true);
            const response = await api.get('/list/official/document');          

            return response.data;
        } catch (error) {
            //console.log(error)
            const message = ERROR_MESSAGES[error.response?.data.eror] || 'Erro desconhecido';
            toast.error(message, {
                autoClose: 1000,
                hideProgressBar: true,
            });

            throw error
        } finally {
            setLoading(false);
        }
    };






    return (
        <AdministrativeContext.Provider value={{ createDocumentType, listDocumentType, loading, createOfficialDocument, listOfficialDocument }}>
            {children}
        </AdministrativeContext.Provider>
    )
}
