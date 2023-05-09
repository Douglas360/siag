import React, {Fragment} from 'react';
import {Route, Routes} from 'react-router-dom';

// Dashboard Widgets

import WidgetsChartBoxes from "./ChartBoxes";

// Layout
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';

const Widgets = () => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">

                    {/* Widgets */}
                    <Routes>
                        <Route path="/" element={<WidgetsChartBoxes/>}/>
                        <Route path="/dashboard-boxes" element={<WidgetsChartBoxes/>}/>
                    </Routes>
                    
                </div>
                <AppFooter/>
            </div>
        </div>

    </Fragment>
);

export default Widgets;