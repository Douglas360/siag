import React, {Component, Fragment} from 'react';
import Tabs from 'react-responsive-tabs';
import PageTitle from '../../../Layout/AppMain/PageTitle';

// Views Components
import RegisterOfficialDocument from './RegisterOfficialDocument/Form';
import ListOfficialDocument from './ListOfficialDocument';

const tabsContent = [
    {
        title: 'Cadastrar Documento',
        content: <RegisterOfficialDocument/>
    },
    {
        title: 'Listar Documentos',
        content: <ListOfficialDocument/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class OfficialJSX extends Component {
    render() {

        return (
            <Fragment>
                 <PageTitle
                    heading="Documentos Oficiais"
                    subheading="Cadastro e listagem de documentação oficial."
                    icon="pe-7s-bandaid icon-gradient bg-amy-crisp"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        );
    }
}