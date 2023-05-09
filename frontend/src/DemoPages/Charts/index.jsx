import React, {Fragment} from 'react';
import {Route, Routes} from 'react-router-dom';

// Charts

import ChartsChartJs from "./ChartJs";

// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';

const Charts = () => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">

                   <Routes>
                     {/* Charts */}

                     <Route path="chartjs" element={<ChartsChartJs/>}/>
                   </Routes>

                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Charts;