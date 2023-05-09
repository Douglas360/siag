import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';

// BUTTONS

// Standard

import ButtonsStandard from './Button/Standard';

// DROPDOWNS

import DropdownExamples from './Dropdowns';

// BADGES & LABELS

import BadgesLabels from './BadgesLabels';

// ICONS

import IconsExamples from './Icons';

// CARDS

import CardsExamples from './Cards';

// LIST GROUP

import ListGroupExample from './ListGroup';

// NAVIGATION

import NavigationExample from './Navs';

// UTILITIES

import UtilitiesExamples from './Utilities';

// Layout
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';

const Elements = () => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Routes>
                        {/* Buttons */}

                        <Route path="buttons-standard" element={<ButtonsStandard />} />

                        {/* Dropdowns */}

                        <Route path="dropdowns" element={<DropdownExamples />} />

                        {/* Badges & Labels */}

                        <Route path="badges-labels" element={<BadgesLabels />} />

                        {/* Icons */}

                        <Route path="icons" element={<IconsExamples />} />

                        {/* Cards */}

                        <Route path="cards" element={<CardsExamples />} />

                        {/* List Group */}

                        <Route path="list-group" element={<ListGroupExample />} />

                        {/* Navs */}

                        <Route path="navigation" element={<NavigationExample />} />

                        {/* Utilities */}

                        <Route path="utilities" element={<UtilitiesExamples />} />
                    </Routes>

                </div>
                <AppFooter />
            </div>
        </div>
    </Fragment>
);

export default Elements;