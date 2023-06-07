import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table } from 'reactstrap';
import Pagination from 'react-bootstrap/Pagination';
import { useRegister } from '../../context/RegisterContext/useRegister';

const DeleteModal = ({ isOpen, toggleModal, handleConfirm }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggleModal} >
            <div className="bg-white rounded-lg p-6 sm:p-8 md:p-10 lg:p-12">
                <ModalHeader toggle={toggleModal} className="text-lg font-medium mb-4">
                    Confirmação de exclusão
                </ModalHeader>
                <ModalBody className="text-gray-600 mb-6">Tem certeza que deseja excluir?</ModalBody>
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

const TableView = ({ columns, rows, handleDelete, handleEdit, id, button1 }) => {
    const { loading } = useRegister();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemsPerPage = (e) => {
        setCurrentPage(1);
        setItemsPerPage(+e.target.value);
    };

    const handleConfirm = () => {
        handleDelete(selectedItem?.[id]);
        setDeleteModalOpen(false);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = rows?.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>

            <div>
                {loading && (
                    <div className="d-flex justify-content-center align-items-center">
                        <Spinner color="primary" />
                    </div>
                )}
                <Table hover responsive>
                    <thead>
                        <tr className="text-center">
                            {columns.map((column, index) => (
                                <th key={index}>{column}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {currentItems?.map((row) => (
                            <tr key={row.id} className="text-center items-center justify-center">
                                {Object.values(row).map((value, index) => (
                                    <td key={index}>{value}</td>
                                ))}
                                <td>
                                    <div>
                                        {!button1 && (
                                            <>
                                                <Button
                                                    outline
                                                    className="mb-2 me-2 btn-transition"
                                                    color="primary"
                                                    onClick={() => handleEdit(row)}
                                                >
                                                    <i className="pe-7s-note btn-icon-wrapper items-" />
                                                </Button>
                                                <Button
                                                    outline
                                                    className="mb-2 me-2 btn-transition"
                                                    color="danger"
                                                    onClick={() => {
                                                        setSelectedItem(row);
                                                        setDeleteModalOpen(true);
                                                    }}
                                                >
                                                    <i className="pe-7s-trash btn-icon-wrapper" />
                                                </Button>
                                            </>
                                        )}
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
                            disabled={indexOfLastItem >= rows?.length}
                        />
                    </Pagination>
                </div>
            </div>


            <DeleteModal
                isOpen={deleteModalOpen}
                toggleModal={() => setDeleteModalOpen(!deleteModalOpen)}
                handleConfirm={handleConfirm}
                loading={loading}
            />
        </>
    );
};

export default TableView;
