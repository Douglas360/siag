import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useRegister } from '../../../../../context/RegisterContext/useRegister';
import EditUserGroupModal from '../components/EditUserGroupModal';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
const TableView = lazy(() => import('../../../../../components/Table/TableView'));

// Modal to show list of users in this group and edit them if necessary
const UserListModal = ({ isOpen, toggleModal, users, handleEdit }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Usuários do Grupo: <span className='text-slate-950'>{users[0]?.nome_grupo}</span></ModalHeader>
      <ModalBody>
        {users && users.length > 0 ? (

          <TableView
            columns={['ID', 'Nome', 'Login', 'Ação']}
            rows={users?.map((row) => {
              return {
                id: row.id,
                nome: row.name,
                email: row.login,
              };
            })}
            id="id_usuario"
            handleEdit={handleEdit}
          />

        ) : (
          <p>No users in this group</p>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleModal} outline>
          Fechar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const ListUserGroupJs = () => {
  const { listUserGroup, deleteUserGroup, updateUserGroup, listUserInsideUserGroup } = useRegister();
  const [userGroup, setUserGroup] = useState([]);
  const [userGroupEditing, setUserGroupEditing] = useState({});
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [userListModalOpen, setUserListModalOpen] = useState(false);
  const [selectedGroupUsers, setSelectedGroupUsers] = useState([]);

  const toggleConfirmationModal = () => {
    setConfirmationModalOpen(!confirmationModalOpen);
  };

  const toggleUpdateModal = () => {
    setUpdateModalOpen(!updateModalOpen);
  };

  const toggleUserListModal = () => {
    setUserListModalOpen(!userListModalOpen);
  };

  useEffect(() => {
    loadUserGroup();
  }, []);

  const loadUserGroup = async () => {
    const response = await listUserGroup();
    setUserGroup(response);
  };

  const handleDelete = async (id) => {
    await deleteUserGroup(id);
    await loadUserGroup();
    // Close the modal
    toggleConfirmationModal();
  };

  const handleUpdate = async (data) => {
    await updateUserGroup(data);
    await loadUserGroup();
  };

  const handleEdit = (row) => {
    setUserGroupEditing(row);
    toggleUpdateModal();
  };

  const handleViewUsers = async (row) => {
    const response = await listUserInsideUserGroup(row.id_grupo);
    setSelectedGroupUsers([row, ...response]);
    toggleUserListModal();
  };

  const handleUpdateUser = (row) => {
    window.location.href = `/update/user/${row.id}`

  };

  const columns = ['ID', 'Nome', 'Descrição', 'Usuários', 'Ação'];

  const rows = userGroup?.map((row) => {
    return {
      id_grupo: row.id_grupo,
      nome_grupo: row.nome_grupo,
      descricao_grupo: row.descricao_grupo,
      usuarios: row.qtd_usuarios === 0 ? (
        <button disabled className="btn btn-primary">
          {row.qtd_usuarios}
        </button>
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => handleViewUsers(row)}
        >
          {row.qtd_usuarios}
        </button>
      ),
    };
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TableView
        columns={columns}
        rows={rows}
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
      <UserListModal
        isOpen={userListModalOpen}
        toggleModal={toggleUserListModal}
        users={selectedGroupUsers}
        handleEdit={handleUpdateUser}
      />
    </Suspense>
  );
};

export default ListUserGroupJs;
