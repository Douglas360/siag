import React, { useEffect, useState, lazy, Suspense } from 'react'
import EditJobNameModal from './components/EditJobNameModal';
import { useRegister } from '../../../../context/RegisterContext/useRegister';
import { useAuth } from '../../../../context/AuthContext/useAuth';
const TableView = lazy(() => import('../../../../components/Table/TableView'));

const ListJobNameJs = () => {
    const { listJobName, deleteJobName, updateJobName } = useRegister()
    const { user } = useAuth()
    const [jobName, setJobName] = useState([]);
    const [jobNameEdit, setJobNameEdit] = useState({});
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    const toggleConfirmationModal = () => {
        setConfirmationModalOpen(!confirmationModalOpen);
    };

    const toggleUpdateModal = () => {
        setUpdateModalOpen(!updateModalOpen);
    };


    useEffect(() => {

        loadJobName()
    }, [])

    const loadJobName = async () => {
        const response = await listJobName(user?.empresa?.id_empresa);
        setJobName(response);

    }

    const handleDelete = async (id) => {
        await deleteJobName(id)

        await loadJobName()
        // Close the modal
        toggleConfirmationModal();

    };

    const handleUpdate = async (data) => {

        await updateJobName(data)
        await loadJobName()

    }

    const handleEdit = (row) => {

        setJobNameEdit(row);
        toggleUpdateModal();
    };

    const columns = ['ID', 'Nome', 'Ação']
    // add id_empresa to jobNameEdit object to update jobName 
    const data = { ...jobNameEdit, id_empresa: user?.empresa?.id_empresa }
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TableView
                columns={columns}
                rows={jobName}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                id="id_cargo"
            />
            <EditJobNameModal
                isOpen={updateModalOpen}
                toggleModal={toggleUpdateModal}
                handleUpdate={handleUpdate}
                jobName={data}
            />


        </Suspense>

    )
}


export default ListJobNameJs