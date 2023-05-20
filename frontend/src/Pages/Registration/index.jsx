import React, { Fragment, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

//Layout
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';


//Pages
const Company = lazy(() => import('./Company'));
const UserProfile = lazy(() => import('./User/CreateProfile'));
const GroupUser = lazy(() => import('./User/CreateGroupUser'));
const User = lazy(() => import('./User/CreateUser'));


const Registration = () => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">

                    {/* Registration */}
                    <Routes>
                        <Route path="/" element={<Company />} />
                        <Route path="company" element={<Company />} />
                        <Route path="profile" element={<UserProfile />} />
                        <Route path="user-group" element={<GroupUser />} />
                        <Route path="user" element={<User />} />

                    </Routes>


                </div>

            </div>
        </div>
    </Fragment>
);

export default Registration;