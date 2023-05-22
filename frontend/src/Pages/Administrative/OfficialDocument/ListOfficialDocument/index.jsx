import React, { useEffect, useState, lazy, Suspense } from 'react'
import { dateFormatWithHours } from '../../../../functions/formatter';
import { useAdministrative } from '../../../../context/AdministrativeContext/useAdministrative';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilePdf,
    faFile,
    faFileWord,
    faFileExcel,
    faEye


} from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'reactstrap';

const TableView = lazy(() => import('../../../../components/Table/TableView'));


const ListOfficialDocumentJs = () => {
    const { listOfficialDocument, updateProfile, deleteProfile } = useAdministrative()
    const [officialDocument, setOfficialDocument] = useState([])

    const [modalOpen, setModalOpen] = useState(false);
    const [editingProfile, setEditingProfile] = useState(null);
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggleTooltip = () => {
        setTooltipOpen(!tooltipOpen);
    };



    useEffect(() => {
        async function loadOfficialDocument() {
            const response = await listOfficialDocument()
            console.log(response)
            setOfficialDocument(response)
        }

        loadOfficialDocument()
    }, [])

    const toggleConfirmationModal = () => {
        setConfirmationModalOpen(!confirmationModalOpen);
    };
    const toogleModal = () => {
        setModalOpen(!modalOpen)
    }
    const handleDelete = async (id) => {
        await deleteProfile(id);
        const response = await listOfficialDocument();
        setEditingProfile(response);
        // Close the modal
        toggleConfirmationModal();


    };
    // Handle the edit action for the table rows 
    const handleEdit = async (row) => {
        setEditingProfile(row)
        toogleModal()
    };

    // Handle Update Profile in the modal
    const handleUpdate = async (data) => {
        await updateProfile(data);
    };

    const getFileExtension = (filename) => {
        const extension = filename.split('.').pop();
        return extension.toLowerCase();
    };

    const getFileIcon = (filename) => {
        const extension = getFileExtension(filename);

        if (extension === 'pdf') {
            return <FontAwesomeIcon icon={faFilePdf} size="2x" />;
        } else if (extension === 'doc' || extension === 'docx') {
            return <FontAwesomeIcon icon={faFileWord} size="2x" />;
        } else if (extension === 'xls' || extension === 'xlsx') {
            return <FontAwesomeIcon icon={faFileExcel} size="2x" />;
        } else {
            // Render a default icon if the file extension is not recognized
            return <FontAwesomeIcon icon={faFile} size="2x" />;
        }
    };

    const columns = ['ID', 'Nº Documento', 'Descrição', 'Tipo', ' Data de Inclusão', 'Data de Alteração', 'Usuário', 'Documento', 'Leitura']
    const leitura = [
        {
            id: 1,
            lidos: 1,
            total_usuarios: 2
        },
        {
            id: 2,
            lidos: 2,
            total_usuarios: 2
        },
        {
            id: 3,
            lidos: 3,
            total_usuarios: 3
        },

    ]

    const rows = officialDocument?.map((row) => {
        return {
            id_doc_oficial: row.id_doc_oficial,
            numero_documento: row.numero_documento,
            descricao: row.descricao,
            tipo: row.tipo,
            dt_criado: row.dt_criado ? dateFormatWithHours(row.dt_criado) : "",
            dt_atualizado: row.dt_atualizado ? dateFormatWithHours(row.dt_atualizado) : "-",
            id_user: row.user?.login,
            documento: (
                <a href={row.arquivo} target="_blank" rel="noreferrer" download>
                    {getFileIcon(row.arquivo)}
                </a>

            ),
            leitura: (
                <a href={row.leitura} target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faEye} size="2x" id={`tooltip-${row.id_doc_oficial}`} onMouseEnter={toggleTooltip} onMouseLeave={toggleTooltip} />
                    <Tooltip placement="top" isOpen={tooltipOpen} target={`tooltip-${row.id_doc_oficial}`} toggle={toggleTooltip}>
                        {`${leitura.lidos}/${leitura.total_usuarios}`}
                    </Tooltip>
                </a>

            )

        }
    }) || []
   
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TableView
                columns={columns}
                rows={rows}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                id="id_doc_oficial"
                button1={"Abrir"} />


        </Suspense>


    )
}

export default ListOfficialDocumentJs