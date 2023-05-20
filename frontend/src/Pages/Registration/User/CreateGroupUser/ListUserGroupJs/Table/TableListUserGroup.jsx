import React, { useEffect, useState } from 'react'
import { useRegister } from '../../../../../../context/RegisterContext/useRegister'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table } from 'reactstrap'
import Pagination from 'react-bootstrap/Pagination';
import EditUserGroupModal from '../../components/EditUserGroupModal';
import { useAuth } from '../../../../../../context/AuthContext/useAuth';


const ConfirmationModal = ({ isOpen, toggleModal, handleConfirm }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggleModal} className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 sm:p-8 md:p-10 lg:p-12">
        <ModalHeader toggle={toggleModal} className="text-lg font-medium mb-4">
          Confirmação de exclusão
        </ModalHeader>
        <ModalBody className="text-gray-600 mb-6">
          Tem certeza que deseja excluir?
        </ModalBody>
        <ModalFooter className="flex justify-end">
          <Button color="secondary" outline className="mr-2" onClick={toggleModal}>
            Cancelar
          </Button>
          <Button color="danger" outline onClick={handleConfirm}>
            Excluir
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

const TableListUserGroup = () => {
  const { listUsers, deleteUserGroup, updateUserGroup, loading, loadingUpdate } = useRegister()
  const [userGroup, setUserGroup] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [userGroupEditing, setUserGroupEditing] = useState({});

  const {user} = useAuth()



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
    const id_empresa = user?.empresa?.id_empresa
    const response = await listUsers(id_empresa);
    setUserGroup(response);
  }


  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userGroup.slice(indexOfFirstItem, indexOfLastItem);

  const handleItemsPerPage = (e) => {
    setCurrentPage(1);
    setItemsPerPage(parseInt(e.target.value));
  };

  const handleDelete = async (id) => {
    await deleteUserGroup(id)

    await loadUserGroup()
    // Close the modal
    toggleConfirmationModal();

  };

  const handleEdit = async (data) => {

    await updateUserGroup(data)
    await loadUserGroup()
      
  }



  return (
    <>{
      loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner color="primary" />
        </div>
      )
        :
        <div >
          <Table hover responsive>
            <thead >
              <tr className='text-center'>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ação</th>
              </tr>
            </thead>

            <tbody>
              {currentItems?.map((row) => (
                <tr key={row.id_user} className='text-center'>
                  <th scope="row">{row.id_user}</th>
                  <td className='text-center'>{row.name}</td>
                  <td className='text-center'>{row.cargo}</td>
                  <td>
                    <div>
                      <Button
                        outline
                        className="mb-2 me-2 btn-transition"
                        color="primary"
                        onClick={() => {
                          setUserGroupEditing(row);
                          toggleUpdateModal();
                        }}
                      >

                        <i className="pe-7s-note btn-icon-wrapper items-" />
                      </Button>
                      <Button
                        outline
                        className="mb-2 me-2 btn-transition"
                        color="danger"
                        onClick={toggleConfirmationModal}
                      >
                        <i className="pe-7s-trash btn-icon-wrapper" />

                      </Button>
                      <ConfirmationModal
                        isOpen={confirmationModalOpen}
                        toggleModal={toggleConfirmationModal}
                        handleConfirm={() => handleDelete(row.id_grupo)}
                      />

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <span>Items Por Página:</span>
              <select
                className="mx-2 form-select"
                value={itemsPerPage}
                onChange={handleItemsPerPage}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div>
            <Pagination>
              <Pagination.Prev
                onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                disabled={currentPage === 1}
              />
              <Pagination.Item active>{currentPage}</Pagination.Item>
              <Pagination.Next
                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                disabled={indexOfLastItem >= userGroup.length}
              />
            </Pagination>
            {loadingUpdate &&
              <div className="d-flex justify-content-center align-items-center">
                <Spinner color="primary" />
              </div>
            }
            <EditUserGroupModal
              isOpen={updateModalOpen}
              toggleModal={toggleUpdateModal}
              handleUpdate={handleEdit}
              userGroup={userGroupEditing}
            />
          </div>

        </div>
    }

    </>
  )
}

export default TableListUserGroup