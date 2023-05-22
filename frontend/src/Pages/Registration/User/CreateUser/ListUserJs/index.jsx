import React, { useEffect, useState, lazy, Suspense } from 'react'
import { useAuth } from '../../../../../context/AuthContext/useAuth'
import { useRegister } from '../../../../../context/RegisterContext/useRegister'

const TableView = lazy(() => import('../../../../../components/Table/TableView'));

const ListUserJs = () => {
  const { user } = useAuth()
  const { listUsers } = useRegister()
  const [userList, setUserList] = useState([])
  const data = {
    id_empresa: user.empresa?.id_empresa
  }
  async function loadUserList() {
    const response = await listUsers(data)

    setUserList(response)

  }

  useEffect(() => {

    loadUserList()
  }, [])
  const columns = ['ID', 'Foto', 'Nome', 'Login', 'Status', 'Ação']
  const rows = userList?.map((user) => {
    return {
      id: user.id,
      avatar: (

        <div className="d-flex justify-content-center align-items-center">
          <img

            className="rounded-circle w-10 bg-cover h-10"
            src={user.avatar}
            alt="Avatar"

          />
        </div>



      ),//avatar: user.foto,      
      nome: user.name,
      login: user.login,
      status: (
        <>
          {   //If the user is active, the status will be "Ativo", otherwise, "Inativo"
            user.ativo === true
              ? <div className="badge bg-success me-1 ms-0">
                <small>Ativo</small>
              </div>
              : <div className="badge bg-red-700 me-1 ms-0">
                <small>Inativo</small>
              </div>


          }
        </>

      ),



    }
  })
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TableView columns={columns} rows={rows} id="id" />
    </Suspense>



  )
}

export default ListUserJs