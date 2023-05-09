import React, {Fragment} from 'react';
import {Route, Routes} from 'react-router-dom';

// COMPONENTS

// Tabs

import TabExample from './Tabs';

// Notifications

import NotificationsExamples from './Notifications';


// Tooltips & Popovers

import TooltipsPopoversExample from './TooltipsPopovers';

// Modals

import ModalsExample from './Modal';

// Progress Bar

import ProgressBarsExamples from './ProgressBar';

// Carousel

import CarouselExample from './Carousel';

// Maps

import MapsExample from './Maps';

// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';

const Components = () => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                   <Routes>
                     {/* Components */}

                    {/* Tabs */}

                    <Route path="tabs" element={<TabExample/>}/>

                    {/* Notifications */}

                    <Route path="notifications" element={<NotificationsExamples/>}/>

                    {/* Tooltips & Popovers */}

                    <Route path="tooltips-popovers" element={<TooltipsPopoversExample/>}/>

                    {/* Progress Bar */}

                    <Route path="progress-bar" element={<ProgressBarsExamples/>}/>

                    {/* Carousel */}

                    <Route path="carousel" element={<CarouselExample/>}/>

                    {/* Modals */}

                    <Route path="modals" element={<ModalsExample/>}/>

                    {/* Maps */}

                    <Route path="maps" element={<MapsExample/>}/>
                   </Routes>

                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Components;