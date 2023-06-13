import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { useWindowSize } from 'react-use';
import { AppRouter } from './routes';
import { ToastContainer } from 'react-toastify';
import './input.css';
import 'devextreme/dist/css/dx.light.css';

function Main() {


    const { width } = useWindowSize();
    const colorScheme = useSelector(state => state.ThemeOptions.colorScheme);
    const enableFixedHeader = useSelector(state => state.ThemeOptions.enableFixedHeader);
    const enableMobileMenu = useSelector(state => state.ThemeOptions.enableMobileMenu);
    const enableFixedFooter = useSelector(state => state.ThemeOptions.enableFixedFooter);
    const enableFixedSidebar = useSelector(state => state.ThemeOptions.enableFixedSidebar);
    const enableClosedSidebar = useSelector(state => state.ThemeOptions.enableClosedSidebar);


    return (
        <Fragment>
            <div className={cx(
                "app-container app-theme-" + colorScheme,
                { 'fixed-header': enableFixedHeader },
                { 'fixed-sidebar': enableFixedSidebar || width < 1250 },
                { 'fixed-footer': enableFixedFooter },
                { 'closed-sidebar': enableClosedSidebar || width < 1250 },
                { 'sidebar-mobile-open': enableMobileMenu },
            )}>

                <AppRouter />
                <ToastContainer />
            </div>
        </Fragment>
    );
}


export default Main;
