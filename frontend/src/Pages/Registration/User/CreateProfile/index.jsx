import React, { Fragment } from 'react'
import PageTitle from '../../../../Layout/AppMain/PageTitle'
import Tabs from 'react-responsive-tabs'


import CreateProfile from './CreateProfileJs'
import ListProfile from './ListProfileJs'

const tabsContent = [
    {
        title: 'Cadastrar Perfil',
        content: <CreateProfile />
    },
    {
        title: 'Listar Perfil',
        content: <ListProfile />
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

const UserProfile = () => {
    return (
        <Fragment>
            <PageTitle
                heading="Perfil de usuário"
                subheading="Cadastro de Perfil de Usuário"
                icon="pe-7s-user icon-gradient bg-amy-crisp"
            />
            <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />

        </Fragment>
    )
}

export default UserProfile