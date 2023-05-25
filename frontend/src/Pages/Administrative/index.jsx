import React, { Fragment, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';

const DocumentTemplate = lazy(() => import('../Administrative/DocumentTemplate'));
const Register = lazy(() => import('../Administrative/Register'));
const OfficialDocument = lazy(() => import('../Administrative/OfficialDocument'));
//const Schedule = lazy(() => import('../Administrative/Schedule'));


const Administrative = () => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">

                    {/* Administrative */}
                    <Routes>
                        <Route path="/" element={<DocumentTemplate />} />
                        <Route path="documentTemplate" element={<DocumentTemplate />} />
                        <Route path="register" element={<Register />} />
                        <Route path="officialDocument" element={<OfficialDocument />} />
                       {/* <Route path="schedule" element={<Schedule />} />*/}

                    </Routes>


                </div>

            </div>
        </div>
    </Fragment>
);

export default Administrative;