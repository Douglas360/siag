import React, { Fragment } from 'react';

// DASHBOARDS

import BasicDashboard from './Basic';

// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';

const Dashboards = () => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <BasicDashboard />
                </div>
                <AppFooter />
            </div>
        </div>
    </Fragment>
);

export default Dashboards;