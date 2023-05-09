import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';

// Tables

import RegularTables from './RegularTables';

// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';

const Tables = () => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">

                    <Routes>
                        {/* Tables */}
                        <Route path="/" element={<RegularTables />} />
                        <Route path="regular-tables" element={<RegularTables />} />
                    </Routes>
                </div>
                <AppFooter />
            </div>
        </div>
    </Fragment>
);

export default Tables;