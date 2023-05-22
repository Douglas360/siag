import React, { useEffect, useState, lazy, Suspense } from 'react'
import { useRegister } from '../../../../../context/RegisterContext/useRegister';
import EditUserGroupModal from '../components/EditUserGroupModal';
const TableView = lazy(() => import('../../../../../components/Table/TableView'));

const ListUserGroupJs = () => {
  const { listUserGroup, deleteUserGroup, updateUserGroup } = useRegister()
  const [userGroup, setUserGroup] = useState([])
  const [userGroupEditing, setUserGroupEditing] = useState({});
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);


  const toggleConfirmationModal = () => {
    setConfirmationModalOpen(!confirmationModalOpen);
  };

  const toggleUpdateModal = () => {
    setUpdateModalOpen(!updateModalOpen);
  };


  useEffect(() => {

    loadUserGroup()
  }, [])

  const loadUserGroup = async () => {
    const response = await listUserGroup();
    setUserGroup(response);
  }


  const handleDelete = async (id) => {
    await deleteUserGroup(id)

    await loadUserGroup()
    // Close the modal
    toggleConfirmationModal();

  };

  const handleUpdate = async (data) => {

    await updateUserGroup(data)
    await loadUserGroup()

  }

  const handleEdit = (row) => {
    setUserGroupEditing(row);
    toggleUpdateModal();
  };


  const columns = ['ID', 'Nome', 'Descrição', 'Ação']

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TableView
        columns={columns}
        rows={userGroup}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        id="id_grupo"
      />
      <EditUserGroupModal
        isOpen={updateModalOpen}
        toggleModal={toggleUpdateModal}
        handleUpdate={handleUpdate}
        userGroup={userGroupEditing}
      />

    </Suspense>

  )
}


export default ListUserGroupJs