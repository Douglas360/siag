import React, { Fragment } from 'react'
import PageTitle from '../../../../Layout/AppMain/PageTitle'
import Tabs from 'react-responsive-tabs'


import CreateUser from './CreateUserJs'
import ListUser from './ListUserJs'
import UpdateUserStatusJs from './UpdateUserStatusJs'

const tabsContent = [
    {
        title: 'Cadastrar Usuário',
        content: <CreateUser />
    },
    {
        title: 'Listar Usuários',
        content: <ListUser />
    },
    {
        title: 'Atualizar Status',
        content: <UpdateUserStatusJs />
    }

];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

const User = () => {
    return (
        <Fragment>
            <PageTitle
                heading="Usuário"
                subheading="Cadastro de Usuário"
                icon="pe-7s-user icon-gradient bg-amy-crisp"
            />
            <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />

        </Fragment>
    )
}

export default User