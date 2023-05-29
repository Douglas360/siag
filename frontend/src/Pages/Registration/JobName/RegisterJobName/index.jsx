import React, { Fragment } from 'react'
import PageTitle from '../../../../Layout/AppMain/PageTitle'
import Tabs from 'react-responsive-tabs'
import CreateJobNameJs from './Form';
import ListJobNameJs from '../ListJobName';


const tabsContent = [
    {
        title: 'Cadastrar Cargo',
        content: <CreateJobNameJs />
    },
    {
        title: 'Listar Cargos',
        content: <ListJobNameJs />
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

const JobName = () => {
    return (
        <Fragment>
            <PageTitle
                heading="Cargo"
                subheading="Cadastro de Cargos"
                icon="pe-7s-server icon-gradient bg-amy-crisp"
            />
            <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />

        </Fragment>
    )
}

export default JobName