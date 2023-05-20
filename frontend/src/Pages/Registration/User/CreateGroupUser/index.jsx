import React, { Fragment } from 'react'
import PageTitle from '../../../../Layout/AppMain/PageTitle'
import Tabs from 'react-responsive-tabs'


import CreateUserGroup from './CreateUserGroupJs'
import ListUserGroup from './ListUserGroupJs'

const tabsContent = [
    {
        title: 'Cadastrar Grupo de usuários',
        content: <CreateUserGroup />
    },
    {
        title: 'Listar Grupo de usuários',
        content: <ListUserGroup />
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

const GroupUser = () => {
    return (
        <Fragment>
            <PageTitle
                heading="Grupo de usuários"
                subheading="Cadastro de Grupo de Usuários"
                icon="pe-7s-user icon-gradient bg-amy-crisp"
            />
            <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />

        </Fragment>
    )
}

export default GroupUser