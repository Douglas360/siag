import React, {Fragment} from 'react';
import {Route, Routes} from 'react-router-dom';

// Forms

import FormElementsLayouts from "./Elements/Layouts";
import FormElementsControls from "./Elements/Controls";
import FormElementsValidation from "./Elements/Validation";

// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';

const Forms = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">

                   <Routes>
                     {/* Form Elements */}
                     <Route path="/" element={<FormElementsLayouts/>}/>
                    <Route path="controls" element={<FormElementsControls/>}/>
                    <Route path="layouts" element={<FormElementsLayouts/>}/>
                    <Route path="validation" element={<FormElementsValidation/>}/>
                   </Routes>

                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Forms;