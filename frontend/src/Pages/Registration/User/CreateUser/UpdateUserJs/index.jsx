import React, { Fragment } from 'react'

import Tabs from 'react-responsive-tabs'
import UpdateUserJs from './form';
import PageTitle from '../../../../../Layout/AppMain/PageTitle';

const tabsContent = [
    {
        title: 'Atualizar Usuário',
        content: <UpdateUserJs />
    },

];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

const UpdateUser = () => {
    return (
        <Fragment>
            <PageTitle
                heading="Usuário"
                subheading="Atualização de Usuário"
                icon="pe-7s-user icon-gradient bg-amy-crisp"
            />
            <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />

        </Fragment>
    )
}

export default UpdateUser