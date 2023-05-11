import React, { useEffect, useState } from 'react'
import { useRegister } from '../../../../../../context/RegisterContext/useRegister'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table } from 'reactstrap'
import Pagination from 'react-bootstrap/Pagination';

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

const TableListProfile = () => {
  const { listProfile, deleteProfile, loading } = useRegister()
  const [profile, setProfile] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    async function loadProfile() {
      const response = await listProfile()

      setProfile(response)
    }
    loadProfile()
  }, [])

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = profile.slice(indexOfFirstItem, indexOfLastItem);

  const handleItemsPerPage = (e) => {
    setCurrentPage(1);
    setItemsPerPage(parseInt(e.target.value));
  };

  const handleConfirm = async (id) => {
    deleteProfile(id)

    const response = await listProfile();
    setProfile(response);
    // Close the modal
    toggleModal();



  };


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
                <tr key={row.id_perfil} className='text-center'>
                  <th scope="row">{row.id_perfil}</th>
                  <td className='text-center'>{row.nome_perfil}</td>
                  <td className='text-center'>{row.descricao_perfil}</td>
                  <td>
                    <div>
                      <Button
                        outline
                        className="mb-2 me-2 btn-transition"
                        color="primary"
                        onClick={() => window.open(row.file, '_blank')}
                      >

                        <i className="pe-7s-note btn-icon-wrapper items-" />
                      </Button>
                      <Button
                        outline
                        className="mb-2 me-2 btn-transition"
                        color="danger"
                        onClick={toggleModal}
                      >
                        <i className="pe-7s-trash btn-icon-wrapper" />

                      </Button>
                      <ConfirmationModal

                        isOpen={modalOpen}
                        toggleModal={toggleModal}
                        handleConfirm={() => handleConfirm(row.id_perfil)}
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
                disabled={indexOfLastItem >= profile.length}
              />
            </Pagination>
          </div>

        </div>
    }

    </>
  )
}

export default TableListProfile