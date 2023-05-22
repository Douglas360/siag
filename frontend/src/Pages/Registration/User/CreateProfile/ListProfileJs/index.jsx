import React, { useEffect, useState, lazy, Suspense } from 'react'
import { useRegister } from '../../../../../context/RegisterContext/useRegister';
import EditProfileModal from '../components/EditProfileModal';
const TableView = lazy(() => import('../../../../../components/Table/TableView'));

const ListProfileJs = () => {
  const { listProfile, updateProfile, deleteProfile } = useRegister()
  const [profile, setProfile] = useState([])

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  async function loadProfile() {
    const response = await listProfile()  
    setProfile(response)
    }

  useEffect(() => {
    
    loadProfile()
  }, [])

  const toggleConfirmationModal = () => {
    setConfirmationModalOpen(!confirmationModalOpen);
  };
  const toogleModal = () => {
    setModalOpen(!modalOpen)
  }   
  const handleDelete = async (id) => {
    await deleteProfile(id);
    const response = await listProfile();
    setProfile(response);
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


  const columns = ['ID', 'Nome', 'Descrição', 'Acão']

  const rows = profile?.map((profile) => {
    return {
      id_perfil: profile.id_perfil,
      nome: profile.nome_perfil,
      descricao: profile.descricao_perfil,
    }
  }) || [] 

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TableView columns={columns} rows={rows} handleDelete={handleDelete} handleEdit={handleEdit} id="id_perfil" />

      <EditProfileModal
        isOpen={modalOpen}
        toggleModal={toogleModal}
        profile={editingProfile}
        handleEdit={handleUpdate}
      />
    </Suspense>

  )
}

export default ListProfileJs