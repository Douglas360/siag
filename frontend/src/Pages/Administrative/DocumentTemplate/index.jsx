import React, {Component, Fragment} from 'react';
import Tabs from 'react-responsive-tabs';
import PageTitle from '../../../Layout/AppMain/PageTitle';

// Views Components
import RegisterDocumentTemplate from './RegisterDocumentTemplate';
import ListDocumentTemplate from './ListDocumentTemplate';

const tabsContent = [
    {
        title: 'Cadastrar Modelo',
        content: <RegisterDocumentTemplate/>
    },
    {
        title: 'Listar Modelos',
        content: <ListDocumentTemplate/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class DocumentTemplateJSX extends Component {
    render() {

        return (
            <Fragment>
                 <PageTitle
                    heading="Modelo De Documento"
                    subheading="Cadastro e listagem de modelos de documentos."
                    icon="pe-7s-bandaid icon-gradient bg-amy-crisp"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        );
    }
}