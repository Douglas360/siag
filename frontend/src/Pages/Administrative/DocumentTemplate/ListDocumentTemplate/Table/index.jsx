import React, { useEffect, useState } from 'react';
import { Button, Table } from 'reactstrap';
import { useAdministrative } from '../../../../../context/AdministrativeContext/useAdministrative';
import { dateFormatWithHours } from '../../../../../functions/formatter'
import Pagination from 'react-bootstrap/Pagination';
import { Spinner } from "reactstrap";

const TableBordered = () => {
  const { listDocumentType, loading } = useAdministrative();
  const [documentType, setDocumentType] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    async function loadDocumentType() {
      const response = await listDocumentType()
      console.log(response)
      setDocumentType(response);
    }
    loadDocumentType();
  }, []);

  // Get current documents
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = documentType.slice(indexOfFirstItem, indexOfLastItem);

  const handleItemsPerPage = (e) => {
    setCurrentPage(1);
    setItemsPerPage(parseInt(e.target.value));
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner color="primary" />
        </div>
      )
        :
        <div>

          <Table className="mb-0" bordered>
            <thead>
              <tr className='text-center'>
                <th>ID</th>
                <th>Nº Documento</th>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Data de Inclusão</th>
                <th>Data de Alteração</th>
                <th>Usuário</th>
                <th>Documento</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((row) => (
                <tr key={row.id_doc_type}>
                  <th scope="row">{row.id_doc_type}</th>
                  <td className='text-center'>{row.number_document}</td>
                  <td className='text-center'>{row.descricao}</td>
                  <td className='text-center'>{row.type}</td>
                  <td className='text-center'>{row.dt_criado ? dateFormatWithHours(row.dt_criado) : ""}</td>
                  <td className='text-center'>{row.dt_atualizado ? dateFormatWithHours(row.dt_atualizado) : "-"}</td>
                  <td className='text-center'>{row?.user?.login}</td>
                  <td className='text-center'>
                    <Button
                      outline
                      className="mb-2 me-2 btn-transition"
                      color="info"
                      onClick={() => window.open(row.file, '_blank')}
                    >
                      Abrir
                    </Button>
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
                disabled={indexOfLastItem >= documentType.length}
              />
            </Pagination>
          </div>
        </div>
      }
    </>

  );
};

export default TableBordered;
