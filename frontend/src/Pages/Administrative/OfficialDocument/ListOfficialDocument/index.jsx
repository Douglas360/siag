import React, { useEffect, useState, lazy, Suspense } from 'react';
import { dateFormatWithHours } from '../../../../functions/formatter';
import { useAdministrative } from '../../../../context/AdministrativeContext/useAdministrative';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilePdf,
    faFile,
    faFileWord,
    faFileExcel,
    faEye,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Tooltip } from 'reactstrap';
import { useAuth } from '../../../../context/AuthContext/useAuth';
import { toast } from 'react-toastify';

const TableView = lazy(() => import('../../../../components/Table/TableView'));

const ListOfficialDocumentJs = () => {
    const { listOfficialDocument, getUserReadDocuments, confirmReadingOfficialDocument, loading, getOfficialDocumentRead } = useAdministrative();
    const { user } = useAuth();
    const [officialDocument, setOfficialDocument] = useState([]);
    const [confirmReading, setConfirmReading] = useState(null);
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState({});
    const [userReadDocuments, setUserReadDocuments] = useState([]);
    const [leitura, setLeitura] = useState([]);

    const ConfirmReadModal = ({ isOpen, toggleModal, handleConfirm }) => {
        return (
            <Modal isOpen={isOpen} toggle={toggleModal}>
                <div>
                    <ModalHeader toggle={toggleModal} className="text-lg font-medium mb-4">
                        Confirmação de leitura
                    </ModalHeader>
                    <ModalBody className="text-gray-600 mb-6">Confirma a leitura desse documento ?</ModalBody>
                    <ModalFooter className="flex justify-end">
                        <Button color="danger" outline className="mr-2" onClick={toggleModal}>
                            Não
                        </Button>
                        <Button color="primary" outline onClick={handleConfirm}>
                            Sim
                        </Button>
                    </ModalFooter>
                </div>
            </Modal>
        );
    };

    const toggleConfirmationModal = () => {
        setConfirmationModalOpen(!confirmationModalOpen);
    };

    const toggleTooltip = (id) => {
        setTooltipOpen((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const getFileExtension = (filename) => {
        const extension = filename.split('.').pop();
        return extension.toLowerCase();
    };

    const getFileIcon = (filename, color) => {
        const extension = getFileExtension(filename);

        if (extension === 'pdf') {
            return <FontAwesomeIcon icon={faFilePdf} size="2x" color={color} />;
        } else if (extension === 'doc' || extension === 'docx') {
            return <FontAwesomeIcon icon={faFileWord} size="2x" color={color} />;
        } else if (extension === 'xls' || extension === 'xlsx') {
            return <FontAwesomeIcon icon={faFileExcel} size="2x" color={color} />;
        } else {
            // Render a default icon if the file extension is not recognized
            return <FontAwesomeIcon icon={faFile} size="2x" />;
        }
    };

    useEffect(() => {
        const loadOfficialDocument = async () => {
            const response = await listOfficialDocument();
            setOfficialDocument(response);
        };

        loadOfficialDocument();
    }, []);

    useEffect(() => {
        const loadUserReadDocuments = async () => {
            const response = await getUserReadDocuments(user?.id);
            setUserReadDocuments(response);
        };

        loadUserReadDocuments();
    }, [user?.id]);

    useEffect(() => {
        const loadOfficialDocumentRead = async () => {
            try {
                const response = await getOfficialDocumentRead(user?.empresa?.id_empresa);
                setLeitura(response);
            } catch (error) {
                toast.error('Error occurred while loading official document read information', {
                    autoClose: 1000,
                    hideProgressBar: true,
                });
            }
        };

        loadOfficialDocumentRead();
    }, []);

    const handleConfirmReading = async () => {
        if (!confirmReading) {
            return;
        }
        const data = {
            id_doc_oficial: confirmReading.id_doc_oficial,
            id_user: user?.id,
        };

        try {
            await confirmReadingOfficialDocument(data);
            toggleConfirmationModal();
            window.open(confirmReading.arquivo, '_blank');
            const listDoc = await listOfficialDocument();
            setOfficialDocument(listDoc);

            const readDocs = await getUserReadDocuments(user?.id);
            setUserReadDocuments(readDocs);

            const readDoc = await getOfficialDocumentRead(user?.empresa?.id_empresa);
            setLeitura(readDoc);
        } catch (error) {
            toast.error('Erro ao confirmar leitura do documento', {
                autoClose: 1000,
                hideProgressBar: true,
            });
        }
    };

    const columns = ['ID', 'Nº Documento', 'Descrição', 'Tipo', ' Data de Inclusão', 'Data de Alteração', 'Usuário', 'Documento', 'Leitura'];

    const rows = officialDocument?.map((row) => {
        const isRead = userReadDocuments.some((doc) => doc.id_doc_oficial === row.id_doc_oficial);
        const documentLeitura = leitura.find((document) => document.id_doc_oficial === row.id_doc_oficial);

        return {
            id_doc_oficial: row.id_doc_oficial,
            numero_documento: row.numero_documento,
            descricao: row.descricao,
            tipo: row.tipo,
            dt_criado: row.dt_criado ? dateFormatWithHours(row.dt_criado) : '',
            dt_atualizado: row.dt_atualizado ? dateFormatWithHours(row.dt_atualizado) : '-',
            id_user: row.user?.login,
            documento: (
                <span
                    onClick={() => {
                        if (isRead) {
                            window.open(row.arquivo, '_blank');
                        } else {
                            setConfirmReading(row);
                            toggleConfirmationModal();
                        }
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    {isRead ? getFileIcon(row.arquivo, '#7c7c7c') : getFileIcon(row.arquivo, '#0051ff')}
                </span>
            ),
            leitura: (
                <div className="d-flex justify-center">
                    <div className="ml-2">
                        <Button
                            id={`TooltipExample-${row.id_doc_oficial}`}

                            outline
                            onClick={() => toggleTooltip(row.id_doc_oficial)}
                        >
                            <FontAwesomeIcon icon={faEye} color={isRead ? '#7c7c7c' : '#0051ff'} />
                        </Button>
                        <Tooltip
                            placement="left"
                            isOpen={tooltipOpen[row.id_doc_oficial]}
                            target={`TooltipExample-${row.id_doc_oficial}`}
                            toggle={() => toggleTooltip(row.id_doc_oficial)}
                        >
                            {documentLeitura && (
                                documentLeitura.qnt_user_read + '/' +
                                documentLeitura.total_users

                            )}
                        </Tooltip>
                    </div>
                </div>
            ),
        };
    }) || [];

    return (
        <Suspense
            fallback={
                loading && (
                    <div className="d-flex justify-content-center">
                        <Spinner color="primary" />
                    </div>
                )
            }
        >
            <TableView columns={columns} rows={rows} id="id_doc_oficial" button1={'Abrir'} />

            <ConfirmReadModal
                isOpen={confirmationModalOpen}
                toggleModal={toggleConfirmationModal}
                handleConfirm={handleConfirmReading}
            />
        </Suspense>
    );
};

export default ListOfficialDocumentJs;
