import React, { Fragment } from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'
import CompanyJs from './CompanyJs/CompanyJs'


const Company = () => {
    return (
        <Fragment>
            <PageTitle
                heading="Empresa"
                subheading="Atualização cadastral da empresa"
                icon="pe-7s-culture icon-gradient bg-amy-crisp"
            />
            {/*<Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>*/}
            <CompanyJs />
        </Fragment>
    )
}

export default Company